import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: '2atqkk07',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skzlnGYUPti3cI8dSj4AOtd0ce22lwKbLqnMwS6npZB406GXJT8QuLUpLRrstIV0iDGykjBFBVSuRCKOE2MevTucmP9DkxP4XWSLQachkWAjR5DGSgtg3zMQHQCwmwVstjrMnsSysMEyNpuY6Zh5nNgvKyBS04Rexx1xj0fWXTrAFFLqJVyW'
});

async function run() {
  const types = await client.fetch(`array::unique(*._type)`);
  console.log("Found types:", types);
  
  const result = {};
  for (const t of types) {
    if (t.startsWith('sanity.')) continue;
    const docs = await client.fetch(`*[_type == "${t}"] | order(_createdAt desc) [0...1]`);
    result[t] = docs;
  }
  
  fs.writeFileSync('sanity-data.json', JSON.stringify(result, null, 2));
  console.log("Wrote sanity-data.json");
}

run().catch(console.error);
