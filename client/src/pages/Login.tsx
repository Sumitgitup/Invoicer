import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Layers, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.data.token);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
      <div className="mb-8 text-center">
        <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
          <Layers className="text-white w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Sign in to Invoicer</h2>
        <p className="text-slate-500 mt-2">Manage your business finances with ease</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
            <input {...register('email')} type="email" required 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800">Forgot password?</a>
            </div>
            <input {...register('password')} type="password" required 
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
              placeholder="••••••••"
            />
          </div>
          
          <button disabled={loading} type="submit" 
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-sm flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an account? <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Create account</Link>
      </p>
    </div>
  );
}