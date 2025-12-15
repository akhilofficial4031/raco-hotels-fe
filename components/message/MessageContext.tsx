"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { MessageContextType, MessageItem, MessageType } from "./types";

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const addMessage = useCallback(
    (type: MessageType, content: string, duration = 3000) => {
      const id = Math.random().toString(36).substring(7);
      const newMessage: MessageItem = { id, type, content, duration };

      setMessages((prev) => [...prev, newMessage]);

      // Auto remove message after duration
      if (duration > 0) {
        setTimeout(() => {
          removeMessage(id);
        }, duration);
      }
    },
    []
  );

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const contextValue: MessageContextType = {
    messages,
    addMessage,
    removeMessage,
  };

  // Set the global message instance when provider mounts
  useEffect(() => {
    const messageAPI = {
      success: (content: string, duration = 3000) =>
        addMessage("success", content, duration),
      error: (content: string, duration = 4500) =>
        addMessage("error", content, duration),
      warning: (content: string, duration = 4500) =>
        addMessage("warning", content, duration),
      info: (content: string, duration = 3000) =>
        addMessage("info", content, duration),
      loading: (content: string, duration = 0) =>
        addMessage("loading", content, duration),
    };

    // Set the global message instance on window
    if (typeof window !== "undefined") {
      (window as any).__messageInstance = messageAPI;
    }
  }, [addMessage]);

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};
