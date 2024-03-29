import { useEffect } from "react";

const useKeypress = (key: string, func: () => void) => {
  useEffect(() => {
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        func();
      }
    };
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, []);
};

export default useKeypress;
