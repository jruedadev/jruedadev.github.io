import { Client, Account } from 'appwrite'

export const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_HOST)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT) // Replace with your project ID

export const account = new Account(client)
export { ID } from 'appwrite'
