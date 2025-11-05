import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'omvw0cyh', // find this in sanity.config.js
  dataset: 'production',
  apiVersion: '2025-11-04', // today's date or a stable API version
  useCdn: true,
})