import React, { createContext, useContext } from "react";
import Toast from "./Toast";
import { useToast as useInternalToast } from "./hooks/useToast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  } = useInternalToast();

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      {/* Render active toasts */}
      {toasts &&
        toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            title={t.title}
            message={t.message}
            duration={t.duration}
            position={t.position}
            targetElement={t.targetElement}
            offset={t.offset}
            onClose={() => removeToast(t.id)}
          />
        ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default ToastProvider;
