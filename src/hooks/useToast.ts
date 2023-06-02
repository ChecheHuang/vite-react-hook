import { useContext } from "react";
import { ToastContext, ToastContextType } from "@/providers/ToastProvider"; // 假設 ToastProvider 檔案位於 providers/ToastProvider.tsx

const useToast = (): ToastContextType => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return toastContext;
};

export default useToast;
