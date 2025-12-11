import { useState, useCallback } from 'react';

let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((options) => {
        const id = ++toastId;
        const newToast = { id, ...options };

        setToasts(prev => [...prev, newToast]);

        // Auto remove after duration
        if (options.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, options.duration || 5000);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    // Convenience methods
    const success = useCallback((message, options = {}) => {
        return addToast({ type: 'success', message, ...options });
    }, [addToast]);

    const error = useCallback((message, options = {}) => {
        return addToast({ type: 'error', message, ...options });
    }, [addToast]);

    const warning = useCallback((message, options = {}) => {
        return addToast({ type: 'warning', message, ...options });
    }, [addToast]);

    const info = useCallback((message, options = {}) => {
        return addToast({ type: 'info', message, ...options });
    }, [addToast]);

    const below = useCallback((message, options = {}) => {
        return addToast({
            type: 'info',
            message,
            ...options,
            position: 'bottom-center',
            targetElement: options.targetElement || 'button-trigger',
            offset: options.offset || { top: 10, left: 0 }
        });
    }, [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info,
        below // NEW: Convenience method for positioning below element
    };
};