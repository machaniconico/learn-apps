"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    function applyStoredTheme() {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(stored);
      } else {
        document.documentElement.classList.add("dark");
      }
    }
    applyStoredTheme();
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
  };

  return (
    <ThemeContext value={{ theme, toggle }}>
      {children}
    </ThemeContext>
  );
}
