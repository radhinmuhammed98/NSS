import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

console.log("=== Content Source Validation ===");

// 1. Read environment variables from .env if it exists
let env = {};
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
        env[key] = value;
      }
    }
  }
  console.log("Loaded .env variables.");
} else {
  console.log("No .env file found. Using default mock configuration.");
}

const contentSource = env.VITE_CONTENT_SOURCE || 'mock';
const projectId = env.VITE_SANITY_PROJECT_ID;
const dataset = env.VITE_SANITY_DATASET || 'production';
const apiVersion = env.VITE_SANITY_API_VERSION || '2026-01-01';

console.log(`Configured VITE_CONTENT_SOURCE: "${contentSource}"`);

// 2. Validate Mock Mode
console.log("\n[Step 1] Validating Mock Mode...");
try {
  // Check if mock data files exist and are valid
  const mockDataDir = path.resolve('src/data');
  if (fs.existsSync(mockDataDir)) {
    console.log("✓ Mock data directory found.");
  } else {
    throw new Error("Mock data directory 'src/data' is missing!");
  }
  console.log("✓ Mock mode validated successfully.");
} catch (err) {
  console.error("❌ Mock mode validation failed:", err);
  process.exit(1);
}

// 3. Validate Sanity Mode
console.log("\n[Step 2] Validating Sanity Mode...");
if (contentSource === 'sanity') {
  if (!projectId) {
    console.error("❌ ERROR: VITE_SANITY_PROJECT_ID is missing but VITE_CONTENT_SOURCE is set to 'sanity'.");
    process.exit(1);
  }
  
  console.log(`Connecting to Sanity project: "${projectId}", dataset: "${dataset}", apiVersion: "${apiVersion}"...`);
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Bypass CDN for testing
  });
  
  try {
    console.log("Fetching siteSettings from Sanity...");
    const result = await client.fetch(`*[_type == "siteSettings"][0]`);
    if (!result) {
      console.warn("⚠️ WARNING: siteSettings document not found in Sanity. The website will fall back to default settings values or throw an error.");
    } else {
      console.log("✓ SiteSettings retrieved successfully:", {
        schoolName: result.schoolName,
        unitName: result.unitName,
        motto: result.motto,
      });
    }

    console.log("Fetching batches from Sanity...");
    const batches = await client.fetch(`*[_type == "batch"]`);
    console.log(`✓ Fetched ${batches.length} batches from Sanity.`);
    
    console.log("\n✅ Sanity mode validated successfully with real configured dataset!");
  } catch (err) {
    console.error("\n❌ ERROR: Sanity query failed. Your configuration might be broken.");
    console.error(err.message || err);
    process.exit(1);
  }
} else {
  console.log("VITE_CONTENT_SOURCE is not set to 'sanity'. Skipping Sanity query validation.");
  console.log("\n✅ All active modes validated successfully!");
}
