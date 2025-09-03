


import { email } from "zod";
import { Client } from "../models/client.model";

export interface ICLientData extends Document {
    name: string,
    email: string,
    address?: string,
}

export const createClientService = async (clientData: ICLientData, userId: string) => {
    const {name, email, address} = clientData;


    const existingClient = await Client.findOne({email, user: userId})
    if (existingClient) {
        throw new Error('You already have a client with this email address.')
    }

    const newClient = new Client({
        name,
        email,
        address,
        user:userId
    })

    await newClient.save();
    return newClient;
}

export const getAllClientsService = async (userId: string, searchQuery?: string) => {
    const query: any = { user: userId};

    if (searchQuery) {
        query.$or = [
            {name: {$regex: searchQuery, $option: 'i'}},
            {email:{$regex: searchQuery, $option: 'i'}}
        ];
    }

    const clients = await Client.find(query);
    return clients;
}