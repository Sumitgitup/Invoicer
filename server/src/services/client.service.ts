



import { Client, ICLient } from "../models/client.model";


export const createClientService = async (clientData: ICLient, userId: string) => {
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
            {name: {$regex: searchQuery, $options: 'i'}},
            {email:{$regex: searchQuery, $options: 'i'}}
        ];
    }

    const clients = await Client.find(query);
    return clients;
}


