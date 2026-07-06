import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "./config";

let clientInstance: any = null;

export async function getSanityClient() {
  if (!clientInstance) {
    if (!SANITY_PROJECT_ID) {
      throw new Error("Cannot instantiate Sanity client without a valid VITE_SANITY_PROJECT_ID.");
    }
    const { createClient } = await import("@sanity/client");
    const useCdn = import.meta.env.DEV ? false : (import.meta.env.VITE_SANITY_USE_CDN !== "false");
    clientInstance = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn,
    });
  }
  return clientInstance;
}
