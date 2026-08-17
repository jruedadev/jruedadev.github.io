import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://jrueda.dev';

const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const projectsCollectionId = process.env.VITE_APPWRITE_COLLECTION_PROJECTS;

if (!endpoint || !projectId || !databaseId || !projectsCollectionId) {
  console.error('[sitemap] Faltan variables VITE_APPWRITE_* — asegúrate de correr con --env-file=.env');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: `${SITE_URL}/`, changefreq: 'monthly', priority: '1.0' },
  { loc: `${SITE_URL}/projects`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE_URL}/contact`, changefreq: 'yearly', priority: '0.5' },
];

async function fetchProjectIds() {
  const url = `${endpoint}/databases/${databaseId}/collections/${projectsCollectionId}/documents?queries[]=${encodeURIComponent(
    JSON.stringify({ method: 'limit', attribute: '', values: [100] })
  )}`;

  const res = await fetch(url, {
    headers: { 'X-Appwrite-Project': projectId },
  });

  if (!res.ok) {
    throw new Error(`Appwrite respondió ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return (data.documents ?? []).map((doc) => doc.$id);
}

function buildSitemap(urls) {
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const projectIds = await fetchProjectIds();
const projectUrls = projectIds.map((id) => ({
  loc: `${SITE_URL}/projects/${id}`,
  changefreq: 'yearly',
  priority: '0.6',
}));

const xml = buildSitemap([...staticUrls, ...projectUrls]);
const outPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml);

console.log(`[sitemap] Generado con ${staticUrls.length + projectUrls.length} URLs (${projectUrls.length} proyectos) → ${outPath}`);
