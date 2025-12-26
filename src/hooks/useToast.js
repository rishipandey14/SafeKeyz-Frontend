import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast, hideToast } from "../features/toast/toastSlice";

export default function useToast() {
  const dispatch = useDispatch();

  const push = useCallback((message) => {
    if (!message) return;
    dispatch(showToast(message));
  }, [dispatch]);

  const clear = useCallback(() => dispatch(hideToast()), [dispatch]);

  return { push, clear };
}
