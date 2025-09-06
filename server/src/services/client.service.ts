
import { Client, ICLient } from "../models/client.model";

// Create a client with user jwt token as header
export const createClientService = async (
  clientData: ICLient,
  userId: string
) => {
  const { name, email, address } = clientData;

  const existingClient = await Client.findOne({ email, user: userId });
  if (existingClient) {
    throw new Error("You already have a client with this email address.");
  }

  const newClient = new Client({
    name,
    email,
    address,
    user: userId,
  });

  await newClient.save();
  return newClient;
};

// Finds all the Client w.r.t their userId
export const getAllClientsService = async (
  userId: string,
  searchQuery?: string
) => {
  const query: any = { user: userId };

  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const clients = await Client.find(query);
  return clients;
};

// Finds a single client by its ID for a specific user.
export const getClientByIdService = async (
  clientId: string,
  userId: string
) => {
  const client = await Client.findOne({ _id: clientId, user: userId });
  if (!client) {
    throw new Error("Client not found or you do not permission do view it.");
  }
  return client;
};

// Update a client's information.

export const updateClientService = async (
  clientId: string,
  userId: string,
  updateData: Partial<ICLient>
) => {
  const client = await Client.findOneAndUpdate(
    { _id: clientId, user: userId },
    updateData,
    { new: true }
  );
  if (!client) {
    throw new Error(
      "Client not found or you do not have permission to edit it."
    );
  }
  return client;
};

// Delete a client

export const deleteClientService = async (clientId: string, userId: string) => {
  const client = await Client.findOneAndDelete({ _id: clientId, user: userId });
  if (!client) {
    throw new Error(
      "Client not found or you do not have permission to delete it."
    );
  }
  return { message: "Client deleted successfully" };
};
