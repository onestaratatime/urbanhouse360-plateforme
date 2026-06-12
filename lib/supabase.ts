import { createClient } from '@supabase/supabase-js';

// Client Supabase pour l'usage public (anon key)
// Utilisé pour :
// - Lire la vue acquereurs_publics (données anonymisées)
// - Insérer de nouveaux acquéreurs via le formulaire
// - Lire les ventes
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Client Supabase avec service_role pour l'espace agence
// Utilisé pour :
// - Lire la table complète acquereurs avec toutes les données (y compris privées)
// - Modifier/supprimer des acquéreurs
// - Gérer les ventes
// ⚠️ Ne JAMAIS exposer ce client côté client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
