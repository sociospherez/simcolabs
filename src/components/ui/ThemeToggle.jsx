import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("simcolabs-theme");

    const nightMode =
      savedTheme === null ? true : savedTheme === "night";

    setIsNight(nightMode);
    document.body.classList.toggle("night", nightMode);
  }, []);

  const handleToggle = () => {
    const nextState = !isNight;
    setIsNight(nextState);
    document.body.classList.toggle("night", nextState);
    localStorage.setItem("simcolabs-theme", nextState ? "night" : "day");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isNight ? "Switch to light mode" : "Switch to dark mode"}
      title={isNight ? "Dark mode" : "Light mode"}
      className="theme-toggle shrink-0"
    >
      <span className={`theme-icon sun ${isNight ? "hidden-icon" : "visible-icon"}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path
            d="M12 1.75V4.25M12 19.75V22.25M4.04 4.04L5.81 5.81M18.19 18.19L19.96 19.96M1.75 12H4.25M19.75 12H22.25M4.04 19.96L5.81 18.19M18.19 5.81L19.96 4.04"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className={`theme-icon moon ${isNight ? "visible-icon" : "hidden-icon"}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.2 14.14A8.5 8.5 0 1 1 9.86 3.8a7 7 0 1 0 10.34 10.34Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}