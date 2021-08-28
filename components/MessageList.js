import React, { useEffect, useState } from 'react';
import {
  getUserCreatedMessages,
  subscribeToReceivedMessages,
} from '../utils/client/messages';

const MessageList = ({ supabase, session }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserCreatedMessages(supabase, session).then(messages => {
      setMessages(messages);
      setIsLoading(false);
    });
    const sub = subscribeToReceivedMessages(supabase, session, payload =>
      console.log(payload)
    );
    setSub(sub);
  }, [supabase, session]);

  useEffect(() => {
    return () => {
      if (sub) {
        supabase.removeSubscription(sub);
      }
    };
  }, [sub, supabase]);

  if (isLoading) {
    return <div>loading messages ...</div>;
  }

  if (!messages || messages.length === 0) {
    return <div>no messages available to see</div>;
  }

  return (
    <div>
      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.content}</li>
        ))}
      </ul>
      <ul></ul>
    </div>
  );
};

export default MessageList;
