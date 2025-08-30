

import {Schema, model} from "mongoose";

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
        unique: true,
        trim: true
    },

    address: {
        type: String,
    },
},{timestamps: true});

export const Client = model<ICLient>('Client', clientSchema);