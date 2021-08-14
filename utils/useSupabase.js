import React from 'react';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_API_ENDPOINT,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

function useSupabase() {
  const [session, setSession] = React.useState(supabase.auth.session());
  supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  return { session, supabase };
}

export default useSupabase;
