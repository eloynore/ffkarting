import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [theme, setTheme] = useState<string>(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="px-6">
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={20}
        sunColor="white"
      />
    </div>
  );
}
