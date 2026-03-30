import { useEffect, useState } from "react";

export default function useThemeMode() {
  const getThemeState = () =>
    typeof document !== "undefined" && document.body.classList.contains("night");

  const [isNight, setIsNight] = useState(getThemeState);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains("night"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isNight;
}