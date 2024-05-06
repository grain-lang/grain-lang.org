import { atom } from "nanostores";

export type Theme = "dark" | "light" | "system";

function getTheme(): Theme {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme")! as Theme;
  }
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export const selectedTheme = atom(getTheme());
