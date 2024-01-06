import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6472219f8fb9ed981690'); // Replace with your project ID

const databases = new Databases(client);

const getDocuments = async function (databaseId, collectionId) {
    databases.listDocuments(databaseId, collectionId);
}

export const account = new Account(client);
export { ID } from 'appwrite';
export { getDocuments };