"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Dashboard from "../components/Dashboard";

// Voeg deze interface toe bovenaan het bestand
declare global {
  interface Window {
    toggleGlobalDarkMode: (isDark: boolean) => void;
  }
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);

    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Expose a global function to toggle dark mode that components can call
    window.toggleGlobalDarkMode = (isDark) => {
      setIsDarkMode(isDark);
    };

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#121212]"
      }`}
    >
      <Dashboard onDarkModeChange={setIsDarkMode} />
    </main>
  );
}
