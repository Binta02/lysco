// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ssbcjdlsvtwllumdphwy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYmNqZGxzdnR3bGx1bWRwaHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTIyMDcsImV4cCI6MjA2MDg4ODIwN30.SXieFm0dRtykZBj0rEW0Tcd0-7L1kvlVWmOFeTMEAHQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,           // sauvegarde la session localement
    detectSessionInUrl: false,      // désactive recherche dans URL (inutile en mobile)
  },
  global: {
    fetch: fetch,                   // utilise le fetch natif de React Native
  },
});