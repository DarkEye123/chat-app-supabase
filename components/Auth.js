import React from "react";

const Auth = ({ supabase }) => {
  const onLogIn = () => {
    supabase.auth.signIn({ provider: "github" });
  };

  return (
    <div>
      <button onClick={onLogIn}>log in via GitHub</button>
    </div>
  );
};

export default Auth;
