import { useEffect } from "react";

export const useKeyboard = (handleKey) => {
  useEffect(() => {
    const onKeyDown = (e) => handleKey(e);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);
};
