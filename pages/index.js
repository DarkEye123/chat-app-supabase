import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import Auth from "../components/Auth";
import {
  checkUserFromSession,
  checkPublicUser,
  syncPublicUserWithSessionUser,
} from "../utils/client/user";

export default function Home({ session, supabase }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session);
  useEffect(() => {
    if (!!session) {
      console.log("found session", session);
      checkUserFromSession(supabase, session).then((user) => {
        if (!user) {
          supabase.auth.signOut();
        } else {
          checkPublicUser(supabase, session).then((user) => {
            if (!user) {
              syncPublicUserWithSessionUser(supabase, session);
            }
            setIsLoggedIn(!!session);
          });
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
