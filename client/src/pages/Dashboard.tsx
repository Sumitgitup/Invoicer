import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { Plus, Search, Calendar, DollarSign, User as UserIcon } from 'lucide-react';

export default function Dashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    api.get('/invoices').then(res => setInvoices(res.data.data));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-emerald-100 text-emerald-700 ring-emerald-600/20';
      case 'OVERDUE': return 'bg-red-100 text-red-700 ring-red-600/20';
      case 'SENT': return 'bg-blue-100 text-blue-700 ring-blue-600/20';
      default: return 'bg-slate-100 text-slate-700 ring-slate-600/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your invoices and payments</p>
        </div>
        <Link 
          to="/invoices/new" 
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} />
          Create Invoice
        </Link>
      </div>

      {/* Invoice Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-semibold text-slate-900">Recent Invoices</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No invoices found. Create your first one!
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-600 font-medium">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                          {inv.client?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="font-medium text-slate-900">{inv.client?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(inv.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-slate-400" />
                        {inv.totalAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}