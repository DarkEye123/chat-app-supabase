import '../styles/globals.css';
import useSupabase from '../utils/useSupabase';

function MyApp({ Component, pageProps }) {
  const { session, supabase } = useSupabase();
  return <Component {...pageProps} session={session} supabase={supabase} />;
}

export default MyApp;
