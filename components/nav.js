import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useActionKey } from "../hooks/useActionKey";
import { useTheme } from "../hooks/useTheme";
import BarsIcon from "./icons/bars";
import DesktopIcon from "./icons/desktop";
import DiscordIcon from "./icons/discord";
import GithubIcon from "./icons/github";
import MoonIcon from "./icons/moon";
import SearchIcon from "./icons/search";
import SunIcon from "./icons/sun";
import TwitterIcon from "./icons/twitter";

function Search() {
  const actionKey = useActionKey();
  return (
    <div className="h-10 grow lg:grow-0">
      <a
        className="flex items-center w-full lg:w-auto h-full px-4 text-sm text-gray-50 bg-gray-10 dark:bg-purple-100 rounded border border-gray-20 dark:border-purple-80 hover:border-gray-30 dark:hover:border-purple-70"
        role="button"
      >
        <SearchIcon className="w-4 h-4 mr-3 stroke-gray-50" />
        <span className="mr-8">Search docs...</span>
        <span className="hidden md:inline-block text-gray-50 text-xs font-medium ml-auto">
          {actionKey ? `${actionKey[0]}K` : ""}
        </span>
      </a>
    </div>
  );
}

function ThemeToggle() {
  let [open, setOpen] = useState(false);
  let [theme, setTheme] = useTheme();
  let [prefersDark, setPrefersDark] = useState();

  useEffect(() => {
    setPrefersDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  let icon;
  if (theme === "dark" || (theme === "system" && prefersDark)) {
    icon = (
      <MoonIcon
        className={`w-6 h-6 lg:w-5 lg:h-5 stroke-gray-30 dark:stroke-gray-50 hover:stroke-gray-40 ${
          theme !== "system"
            ? "stroke-purple-50 dark:stroke-purple-30 hover:stroke-purple-50 dark:hover:stroke-purple-20"
            : ""
        }`}
      />
    );
  } else {
    icon = (
      <SunIcon
        className={`w-6 h-6 lg:w-5 lg:h-5 stroke-gray-30 dark:stroke-gray-50 hover:stroke-gray-40 ${
          theme !== "system"
            ? "stroke-purple-50 dark:stroke-purple-30 hover:stroke-purple-50 dark:hover:stroke-purple-20"
            : ""
        }`}
      />
    );
  }

  function applyTheme(theme) {
    setOpen(false);
    setTheme(theme);
  }

  return (
    <div className="my-auto relative">
      <a role="button" onClick={() => setOpen(!open)}>
        {icon}
      </a>
      <div
        className={`${
          open ? "absolute" : "hidden"
        } w-36 -right-4 top-12 p-2 shadow rounded border border-gray-20 dark:border-purple-70 bg-white dark:bg-purple-90 z-50`}
      >
        <ul>
          <li>
            <a
              role="button"
              onClick={() => applyTheme("light")}
              className={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
                theme === "light"
                  ? "text-purple-50 dark:text-purple-30"
                  : "text-gray-60 dark:text-gray-50"
              }`}
            >
              <SunIcon
                className={`h-5 w-5 stroke-gray-50 ${
                  theme === "light"
                    ? "stroke-purple-50 dark:stroke-purple-30"
                    : ""
                } mr-3`}
              />{" "}
              Light
            </a>
          </li>
          <li>
            <a
              role="button"
              onClick={() => applyTheme("dark")}
              className={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
                theme === "dark"
                  ? "text-purple-50 dark:text-purple-30"
                  : "text-gray-60 dark:text-gray-50"
              }`}
            >
              <MoonIcon
                className={`h-5 w-5 stroke-gray-50 ${
                  theme === "dark"
                    ? "stroke-purple-50 dark:stroke-purple-30"
                    : ""
                } mr-3`}
              />{" "}
              Dark
            </a>
          </li>
          <li>
            <a
              role="button"
              onClick={() => applyTheme("system")}
              className={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
                theme === "system"
                  ? "text-purple-50 dark:text-purple-30"
                  : "text-gray-60 dark:text-gray-50"
              }`}
            >
              <DesktopIcon
                className={`h-5 w-5 stroke-gray-50 ${
                  theme === "system"
                    ? "stroke-purple-50 dark:stroke-purple-30"
                    : ""
                } mr-3`}
              />{" "}
              System
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function IconLinks() {
  return (
    <div className="flex space-x-4 lg:space-x-3 mt-4 lg:mt-0 lg:ml-8">
      <Link
        className="my-auto"
        href="https://discord.com/invite/grain-lang"
        target="_blank"
      >
        <DiscordIcon className="fill-gray-30 hover:fill-gray-40 h-6 lg:h-4 dark:fill-gray-50 dark:hover:fill-gray-40" />
      </Link>
      <Link
        className="my-auto"
        href="https://twitter.com/grain_lang"
        target="_blank"
      >
        <TwitterIcon className="fill-gray-30 hover:fill-gray-40 h-6 lg:h-4 dark:fill-gray-50 dark:hover:fill-gray-40" />
      </Link>
      <Link
        className="my-auto"
        href="https://github.com/grain-lang/grain"
        target="_blank"
      >
        <GithubIcon className="fill-gray-30 hover:fill-gray-40 h-6 lg:h-[17px] dark:fill-gray-50 dark:hover:fill-gray-40" />
      </Link>
      <div className="h-8 border-r border-r-gray-20 dark:border-r-gray-50 my-auto" />
      <ThemeToggle />
    </div>
  );
}

function NavLinks() {
  return (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 space-y-2 lg:space-y-0 text-xl lg:text-sm">
      <li>
        <Link href="/docs/guide">Guide</Link>
      </li>
      <li>
        <Link href="/docs">Documentation</Link>
      </li>
      <li>
        <Link href="https://discord.com/invite/grain-lang">Community</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/try">Playground</Link>
      </li>
    </ul>
  );
}

function Nav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <nav className="shadow-sm dark:shadow-purple-80 bg-white dark:bg-purple-90 relative z-40 sticky top-0">
      <div className="container mx-auto h-14 px-4 py-2 flex items-center text-sm text-gray-60 dark:text-gray-30">
        <Link href="/">
          <Image
            src="./images/grain-logo.svg"
            width={84}
            height={26}
            alt="The Grain logo, consisting of a single blood-orange wheat flower with three points followed the word 'Grain'."
            className="dark:hidden mr-2"
          />
          <Image
            src="./images/grain-logo-dark.svg"
            width={84}
            height={26}
            alt="The Grain logo, consisting of a single blood-orange wheat flower with three points followed the word 'Grain'."
            className="hidden dark:block mr-2"
          />
        </Link>
        <div className="hidden lg:block mx-auto">
          <NavLinks />
        </div>
        <Search />
        <div className="hidden lg:flex">
          <IconLinks />
        </div>
        <div
          className={`flex lg:hidden flex-col w-72 h-[calc(100vh-3.5rem)] fixed top-14 right-0 p-3 bg-gray-5 dark:bg-purple-90 shadow transition-transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <NavLinks />
          <IconLinks />
        </div>
        <a
          className="lg:hidden"
          role="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <BarsIcon className="w-6 h-6 text-gray-40 dark:text-gray-60 ml-4" />
        </a>
      </div>
    </nav>
  );
}

export default Nav;
