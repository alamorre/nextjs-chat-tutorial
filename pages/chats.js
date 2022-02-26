import React, { useState, useEffect, useContext } from "react";

import { Context } from "../context";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { 

  ChatList, ChatCard, NewChatForm,
  ChatFeed, ChatHeader, IceBreaker, MessageBubble, IsTyping, ConnectionBar, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings
} from 'react-chat-engine'


const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Home() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret]);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID="9753ad89-d325-4c0f-9ff7-97d819b37e36"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
          renderChatHeader={(chat) => <ChatHeader />}
          renderChatCard={(chat, index) => <ChatCard key={`${index}`} chat={chat} />}
          renderChatList={(chatAppState) => <ChatList {...chatAppState}  />}
        />
      </div>
    </div>
  );
}
