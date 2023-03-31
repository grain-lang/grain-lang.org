import localFont from "next/font/local";
import "../styles/global.css";

import { ThemeContext } from "../hooks/useTheme";
import { useEffect, useState, useCallback } from "react";

const soehne = localFont({
  src: [
    {
      path: "../public/fonts/soehne-leicht.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/soehne-buch.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/soehne-kraftig.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-soehne",
});

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("system");
  const [darkMode, setDarkMode] = useState();

  const wrappedSetTheme = useCallback(
    (theme) => {
      if (["light", "dark"].includes(theme)) {
        localStorage.theme = theme;
      } else {
        localStorage.removeItem("theme");
      }
      setTheme(theme);
    },
    [setTheme]
  );

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setTheme("dark");
    } else if (localStorage.theme === "light") {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    setDarkMode(
      theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme, setDarkMode]);

  return (
    <ThemeContext.Provider value={[theme, wrappedSetTheme]}>
      <main
        className={`${
          soehne.variable
        } font-sans antialiased tracking-wide bg-gray-10 ${
          darkMode ? "dark bg-purple-90" : ""
        }`}
      >
        <Component {...pageProps} />
      </main>
    </ThemeContext.Provider>
  );
}
