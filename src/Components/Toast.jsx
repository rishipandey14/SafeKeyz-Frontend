import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { hideToast } from "../utils/toastSlice";

const Toast = () => {
  const {message, visible} = useSelector((store) => store.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }

  }, [visible, dispatch]);

  if(!visible) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] bg-green-400 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  )
}

export default Toast