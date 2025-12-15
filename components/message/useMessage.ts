"use client";

import { useMessageContext } from "./MessageContext";
import { MessageAPI } from "./types";

export const useMessage = (): MessageAPI => {
  const { addMessage } = useMessageContext();

  return {
    success: (content: string, duration = 3000) => {
      addMessage("success", content, duration);
    },
    error: (content: string, duration = 4500) => {
      addMessage("error", content, duration);
    },
    warning: (content: string, duration = 4500) => {
      addMessage("warning", content, duration);
    },
    info: (content: string, duration = 3000) => {
      addMessage("info", content, duration);
    },
    loading: (content: string, duration = 0) => {
      addMessage("loading", content, duration);
    },
  };
};
