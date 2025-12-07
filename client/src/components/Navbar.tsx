import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, FileText, LogOut, Layers } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Layers className="w-5 h-5 text-white" />
              </div>
              Invoicer
            </Link>
            
            {user && (
              <div className="hidden sm:flex sm:space-x-4">
                <NavLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={isActive('/')} />
                <NavLink to="/clients" icon={<Users size={18} />} label="Clients" active={isActive('/clients')} />
                <NavLink to="/invoices/new" icon={<FileText size={18} />} label="New Invoice" active={isActive('/invoices/new')} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                 <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-2">Login</Link>
                 <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}