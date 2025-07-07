"use client";
// Simplified version
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 3000;

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type Toast = Required<Pick<ToastProps, "id">> & ToastProps;

type State = {
  toasts: Toast[];
};

export const toastState = {
  toasts: [] as Toast[],
  listeners: new Set<(state: State) => void>(),

  subscribe(listener: (state: State) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },

  notify() {
    this.listeners.forEach((listener) => {
      listener({ toasts: this.toasts });
    });
  },

  addToast(props: ToastProps) {
    const id = Math.random().toString(36).substr(2, 9);

    this.toasts = [{ id, ...props }, ...this.toasts].slice(0, TOAST_LIMIT);

    this.notify();

    setTimeout(() => {
      this.dismissToast(id);
    }, TOAST_REMOVE_DELAY);

    return id;
  },

  dismissToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  },
};

export function useToast() {
  const [state, setState] = React.useState<State>({ toasts: [] });

  React.useEffect(() => {
    return toastState.subscribe(setState);
  }, []);

  return {
    toasts: state.toasts,
    toast: (props: ToastProps) => toastState.addToast(props),
    dismiss: (id: string) => toastState.dismissToast(id),
  };
}

export const toast = (props: ToastProps) => toastState.addToast(props);
