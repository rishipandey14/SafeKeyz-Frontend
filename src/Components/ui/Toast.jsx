import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../features/toast/toastSlice";

export default function Toast() {
  const { message, visible } = useSelector((store) => store.toast);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, dispatch]);

  if (!show || !visible) return null;

  return (
    <div className="fixed top-6 left-1/2 z-[9999] max-w-xs w-[90vw] sm:w-auto transform -translate-x-1/2 bg-gray-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fadeIn animate-duration-500" role="alert" aria-live="assertive">
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => setShow(false)} aria-label="Close notification" className="ml-4 text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
