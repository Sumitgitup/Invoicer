
import { Invoice, IInvoice } from "../models/invoice.model";
import { Client } from "../models/client.model";


export const createInvoiceService = async(invoiceData: IInvoice, userId: string) => {
    const {client: clientId, items, issueDate, dueDate, status} = invoiceData;

    const client = await Client.findOne({_id: clientId, user: userId});
    if (!client) {
        throw new Error('Client not found or does not belong to this user.')
    }
    // 2. Calculate the totat amount on the backend for security
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    // 3. Generate a unique invoice number 
    const currentYear = new Date().getFullYear();
    const invoiceCount  = await Invoice.countDocuments({user: userId});
    const invoiceNumber = `${currentYear}-${invoiceCount + 1}`.toString().padStart(3,'0');

    const newInvoice = new Invoice({
        ...invoiceData,
        invoiceNumber,
        totalAmount,
        user:userId
    })

    await newInvoice.save();
    return newInvoice;
}

export const getAllInvoicesService = async (userId: string) => {
  // This query is correct. It expects userId to be a string.
  const invoices = await Invoice.find({ user: userId })
    .populate('client', 'name email'); // Populate is great for showing client details!
  return invoices;
};