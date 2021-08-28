async function getUserCreatedMessages(client, session) {
  if (session.user) {
    const { data } = await client
      .from('messages')
      .select('id, content, recipient')
      .eq('author', session.user.id);
    return data;
  }
}

async function subscribeToReceivedMessages(client, session, cb) {
  if (session.user) {
    const sub = client
      .from(`messages:recipient=eq.${session.user.id}`)
      .on('*', cb)
      .subscribe();
    return sub;
  }
}

export { getUserCreatedMessages, subscribeToReceivedMessages };
