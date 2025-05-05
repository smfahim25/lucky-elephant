import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
