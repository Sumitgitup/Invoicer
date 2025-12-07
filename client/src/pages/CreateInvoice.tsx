import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Calendar, User, Save } from 'lucide-react';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      client: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ description: 'Web Development Services', quantity: 1, unitPrice: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const items = watch("items");
  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  useEffect(() => {
    api.get('/client').then(res => setClients(res.data.data));
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await api.post('/invoices', { ...data, status: 'SENT' });
      toast.success('Invoice generated successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">New Invoice</h1>
        <p className="text-slate-500">Create and send a new invoice to your client.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Top Section: Client & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} /> Bill To
                </label>
                <select 
                  {...register('client', { required: true })} 
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                >
                  <option value="">Select a Client...</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>{client.name}</option>
                  ))}
                </select>
                {clients.length === 0 && (
                  <p className="text-xs text-amber-600">No clients found. Please add a client first.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-500 uppercase">Issue Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                      <input type="date" {...register('issueDate')} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-500 uppercase">Due Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                      <input type="date" {...register('dueDate', { required: true })} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
              </div>
            </div>

            <div className="border-t border-slate-100 my-6"></div>

            {/* Line Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Line Items</h3>
              </div>
              
              <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-500 font-medium">
                    <tr>
                      <th className="px-4 py-3 text-left w-1/2">Description</th>
                      <th className="px-4 py-3 text-right w-20">Qty</th>
                      <th className="px-4 py-3 text-right w-32">Price</th>
                      <th className="px-4 py-3 text-right w-32">Total</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {fields.map((field, index) => (
                      <tr key={field.id} className="group bg-white">
                        <td className="p-2">
                          <input 
                            {...register(`items.${index}.description` as const)} 
                            placeholder="Item description"
                            className="w-full p-2 border-0 focus:ring-0 bg-transparent placeholder-slate-400 font-medium"
                          />
                        </td>
                        <td className="p-2">
                          <input 
                            type="number" 
                            {...register(`items.${index}.quantity` as const)} 
                            className="w-full p-2 text-right border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="p-2">
                          <input 
                            type="number" 
                            {...register(`items.${index}.unitPrice` as const)} 
                            className="w-full p-2 text-right border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-right text-slate-700 font-medium">
                          ${(items[index]?.quantity * items[index]?.unitPrice || 0).toFixed(2)}
                        </td>
                        <td className="p-2 text-center">
                          <button type="button" onClick={() => remove(index)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button 
                  type="button" 
                  onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
                  className="w-full py-3 text-sm text-indigo-600 font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Line Item
                </button>
              </div>
            </div>

            {/* Footer / Totals */}
            <div className="flex justify-end pt-6">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
          
          {/* Action Bar */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-sm flex items-center gap-2 disabled:opacity-70"
            >
              <Save size={18} />
              {isSubmitting ? 'Generating...' : 'Save & Send Invoice'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}