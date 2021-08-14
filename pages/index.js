import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Auth from '../components/Auth';

export default function Home({ session, supabase }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session);
  useEffect(() => {
    setIsLoggedIn(!!session);
    if (!!session) {
      console.log('found session', session);
      supabase
        .from('users')
        .select('id')
        .eq('id', session.user.id)
        .then(({ data }) => {
          console.log('data', data);
          const [user] = data;
          console.log('checking: user exists in public', !!user);
          if (!user) {
            supabase
              .from('users')
              .insert([
                {
                  username: session.user.user_metadata.user_name,
                  id: session.user.id,
                },
              ])
              .then(data =>
                console.log('auth user synced with public, data', data)
              );
          }
        });
    }
  }, [session, supabase]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Egghead Supabase Chat App</title>
      </Head>

      <main className={styles.main}>
        {isLoggedIn ? (
          <span>Hooray You are In!</span>
        ) : (
          <Auth supabase={supabase}></Auth>
        )}
      </main>
    </div>
  );
}
