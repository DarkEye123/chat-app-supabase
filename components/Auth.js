import React from 'react';

const Auth = ({ supabase }) => {
  const onLogIn = async () => {
    const {} = await supabase.auth.signIn({ provider: 'github' });
    console.log(e);
  };

  return (
    <div>
      <button onClick={onLogIn}>log in via GitHub</button>
    </div>
  );
};

export default Auth;
