

import {Schema, model, Document} from "mongoose";

export interface ICLient extends Document{
    name: string,
    email: string,
    address?: string,
    user: Schema.Types.ObjectId;
}

const clientSchema = new Schema<ICLient> ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
},{timestamps: true});


clientSchema.index({user:1, email:1}, {unique: true})
export const Client = model<ICLient>('Client', clientSchema);