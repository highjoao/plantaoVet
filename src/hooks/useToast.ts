import { useCallback, useEffect, useRef, useState } from "react";

interface ToastState {
  message: string | null;
  icon: string;
}

/** Toast simples com auto-dismiss. */
export function useToast(duration = 2400) {
  const [state, setState] = useState<ToastState>({ message: null, icon: "favorite" });
  const timer = useRef<number | null>(null);

  const show = useCallback(
    (message: string, icon = "favorite") => {
      if (timer.current) window.clearTimeout(timer.current);
      setState({ message, icon });
      timer.current = window.setTimeout(() => {
        setState((s) => ({ ...s, message: null }));
      }, duration);
    },
    [duration],
  );

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return { message: state.message, icon: state.icon, show };
}
