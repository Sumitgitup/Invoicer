import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { UserPlus, Mail, MapPin, Trash2, Building2, Users } from 'lucide-react';

interface Client {
  _id: string;
  name: string;
  email: string;
  address: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const { register, handleSubmit, reset } = useForm<Client>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchClients = async () => {
    try {
      const { data } = await api.get('/client');
      setClients(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const onSubmit = async (data: Client) => {
    setIsSubmitting(true);
    try {
      await api.post('/client', data);
      toast.success('Client added successfully');
      reset();
      fetchClients();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error adding client');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Add Client Card */}
      <div className="lg:col-span-1 h-fit">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <UserPlus size={20} />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Add New Client</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company / Name</label>
              <input {...register('name')} placeholder="e.g. Acme Corp" required 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input {...register('email')} placeholder="contact@company.com" type="email" required 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Billing Address</label>
              <textarea {...register('address')} placeholder="Street, City, Zip" rows={3}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none" 
              />
            </div>
            <button type="submit" disabled={isSubmitting} 
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Client'}
            </button>
          </form>
        </div>
      </div>

      {/* Client List Grid */}
      <div className="lg:col-span-2">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-slate-400"/>
          Your Clients ({clients.length})
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {clients.map((client) => (
            <div key={client._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={async () => {
                      if(!confirm('Are you sure you want to delete this client?')) return;
                      await api.delete(`/client/${client._id}`);
                      fetchClients();
                  }}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  title="Delete Client"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg truncate">{client.name}</h3>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={14} />
                  <span className="truncate">{client.email}</span>
                </div>
                {client.address && (
                  <div className="flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{client.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {clients.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
              <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <Users className="text-slate-400" />
              </div>
              <h3 className="text-slate-900 font-medium">No clients yet</h3>
              <p className="text-slate-500 text-sm">Add your first client to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}