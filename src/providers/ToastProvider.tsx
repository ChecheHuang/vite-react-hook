import React, { createContext } from "react";
import { message } from "antd";

export interface ToastContextType {
  showToast: (type: MessageType, content: string) => void;
}

type MessageType = "success" | "error" | "warning";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showToast = (type: MessageType, content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  const toastContextValue: ToastContextType = {
    showToast,
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      {contextHolder}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
