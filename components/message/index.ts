export { MessageProvider } from "./MessageContext";
export { default as MessageContainer } from "./MessageContainer";
export { useMessage } from "./useMessage";
export * from "./types";

// Create a message object that mimics Ant Design's message API
const createMessageAPI = () => {
  if (typeof window === "undefined") {
    // SSR-safe fallback
    return {
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
      loading: () => {},
    };
  }

  return {
    success: (content: string, duration?: number) => {
      const instance = (window as any).__messageInstance;
      if (instance) {
        instance.success(content, duration);
      } else {
        console.warn("Message provider not initialized");
      }
    },
    error: (content: string, duration?: number) => {
      const instance = (window as any).__messageInstance;
      if (instance) {
        instance.error(content, duration);
      } else {
        console.warn("Message provider not initialized");
      }
    },
    warning: (content: string, duration?: number) => {
      const instance = (window as any).__messageInstance;
      if (instance) {
        instance.warning(content, duration);
      } else {
        console.warn("Message provider not initialized");
      }
    },
    info: (content: string, duration?: number) => {
      const instance = (window as any).__messageInstance;
      if (instance) {
        instance.info(content, duration);
      } else {
        console.warn("Message provider not initialized");
      }
    },
    loading: (content: string, duration?: number) => {
      const instance = (window as any).__messageInstance;
      if (instance) {
        instance.loading(content, duration);
      } else {
        console.warn("Message provider not initialized");
      }
    },
  };
};

export const message = createMessageAPI();
