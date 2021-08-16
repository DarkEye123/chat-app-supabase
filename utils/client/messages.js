async function getUserMessages(client, session) {
  if (session.user) {
    const { data } = await client
      .from("messages")
      .select("id, content")
      .eq("author", session.user.id);
    return data;
  }
}

export { getUserMessages };
