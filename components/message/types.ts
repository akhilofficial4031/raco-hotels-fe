export type MessageType = "success" | "error" | "warning" | "info" | "loading";

export interface MessageItem {
  id: string;
  type: MessageType;
  content: string;
  duration?: number;
}

export interface MessageContextType {
  messages: MessageItem[];
  addMessage: (type: MessageType, content: string, duration?: number) => void;
  removeMessage: (id: string) => void;
}

export interface MessageAPI {
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  warning: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
  loading: (content: string, duration?: number) => void;
}
