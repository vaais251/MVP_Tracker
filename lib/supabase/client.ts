import { createBrowserClient as ssrCreateBrowserClient } from '@supabase/ssr'

export function createTypedBrowserClient(rawUrl?: string, rawKey?: string) {
  if (!rawUrl || !rawKey) return null;

  let url = String(rawUrl).trim().replace(/\/$/, '');
  url = url.replace(/\/(rest|graphql|auth)(\/v1)?\/?$/, '');
  url = url.replace(/^['"]|['"]$/g, ''); // strip accidental quotes
  
  let key = String(rawKey).trim().replace(/^['"]|['"]$/g, '');

  if (!url.startsWith('http')) url = `https://${url}`;

  return ssrCreateBrowserClient(url, key);
}

