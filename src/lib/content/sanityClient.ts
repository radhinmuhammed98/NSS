import { createClient } from "@sanity/client";
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "./config";

let clientInstance: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
  if (!clientInstance) {
    if (!SANITY_PROJECT_ID) {
      throw new Error("Cannot instantiate Sanity client without a valid VITE_SANITY_PROJECT_ID.");
    }
    clientInstance = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
    });
  }
  return clientInstance;
}
