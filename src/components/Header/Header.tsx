import React, { useState, useEffect } from "react";
import "./Header.css";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const ThemeIcon = () => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const initialTheme = (() => {
      if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
        return localStorage.getItem("theme") || "light";
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    })();

    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("theme", initialTheme);
  }, []);

  const handleToggleClick = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <button
      id="themeToggle"
      onClick={handleToggleClick}
      aria-label="Toggle theme"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      {theme === "light" ? (
        // Moon icon - shown in light mode to switch to dark
        <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
            fill="currentColor"
          ></path>
        </svg>
      ) : (
        // Sun icon - shown in dark mode to switch to light
        <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </button>
  );
};

const Header: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleAstroPageLoad = () => {
      // Reinicializar estado cuando la página cargue
      setIsMenuOpen(false);
    };

    window.addEventListener("astro:page-load", handleAstroPageLoad);
    return () => {
      window.removeEventListener("astro:page-load", handleAstroPageLoad);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <a href="/">
        <h1>irbv.dev</h1>
      </a>
      <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noopener noreferrer" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <ThemeIcon />
      <button
        id="menu"
        aria-label="Toggle Menu"
        className="nav-toggle"
        onClick={toggleMenu}
      >
        <svg className="menu" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
