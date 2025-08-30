
import { Schema, model, Document } from "mongoose";

export interface IInvoiceItem extends Document{
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface IInvoice extends Document{
    invoiceNumber: string
    status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
    issueDate: Date;
    dueDate: Date;
    items: IInvoiceItem[];
    totalAmount: Number;
    client: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}


const invoiceItemSchema = new Schema<IInvoiceItem>({
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }

})

const invoiceSchema = new Schema<IInvoice>({
    invoiceNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SENT', 'PAID', 'OVERDUE'],
        default: 'DRAFT',
        required: true
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    items: [invoiceItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId, ref: 'Client', required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
},{timestamps: true});


export const Invoice = model<IInvoice>('Invoice', invoiceSchema)