import { Client, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const databaseId = '698ca74b000dfe33e2ce';
export const collectionId = 'products';

// Optional collection IDs for dynamic content. Set these via .env if you created
// collections with different IDs in Appwrite. Defaults assume collection names as IDs.
export const pagesCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_PAGES || 'pages';
export const sectionsCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_SECTIONS || 'sections';
export const testimonialsCollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_TESTIMONIALS || 'testimonials';