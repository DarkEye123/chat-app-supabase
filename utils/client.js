async function checkUserFromSession(client, session) {
  const { user, _data, _error } = await client.auth.api.getUser(
    session.access_token
  );
  return user;
}

async function checkPublicUser(client, session) {
  if (session.user) {
    const {
      data: [user],
    } = await client.from("users").select("id").eq("id", session.user.id);
    console.log("checking: user exists in public", !!user);
    return user;
  }
}

async function syncPublicUserWithSessionUser(client, session) {
  if (session.user) {
    const data = await client.from("users").insert([
      {
        username: session.user.user_metadata.user_name, // TODO check other than github
        id: session.user.id,
      },
    ]);
    console.log("auth user synced with public, data", data);
  }
}

export { checkUserFromSession, checkPublicUser, syncPublicUserWithSessionUser };
