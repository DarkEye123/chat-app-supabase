import React, { useEffect, useState } from "react";
import { getUserMessages } from "../utils/client/messages";

const MessageList = ({ supabase, session }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUserMessages(supabase, session).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
    });
  }, [supabase, session]);

  if (isLoading) {
    return <div>loading messages ...</div>;
  }

  if (!messages || messages.length === 0) {
    return <div>no messages available to see</div>;
  }

  return (
    <div>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
