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
    >
      {theme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
};

const Header: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleAstroPageLoad = () => {
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
        <h1 className="site-title">irvb.dev</h1>
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
      <div className="header-right">
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
      </div>
    </header>
  );
};

export default Header;
