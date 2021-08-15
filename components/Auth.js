import React, { useState } from "react";

const Auth = ({ supabase }) => {
  const [loading, setLoading] = useState(false);
  const onLogIn = () => {
    setLoading(true);
    supabase.auth.signIn({ provider: "github" });
  };

  return (
    <div>
      <button onClick={onLogIn}>
        {!loading ? "log in via GitHub" : "loading ..."}
      </button>
    </div>
  );
};

export default Auth;
