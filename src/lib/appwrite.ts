import { Client, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const storage = new Storage(client);
export const databases = new Databases(client);

// Helper para obtener la URL de preview de un archivo
export const getFilePreviewUrl = (fileId: string, bucketId: string) => {
  return storage.getFilePreview(bucketId, fileId);
}

export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const profileCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_PROFILE;
export const projectsCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_PROJECTS;
export const skillsCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_SKILLS;
export const certificationsCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_CERTIFICATIONS;
export const experiencesCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_EXPERIENCES;