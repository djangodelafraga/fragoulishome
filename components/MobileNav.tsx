// ============================================
// fragoulishome.gr — MobileNav
// Clean hamburger toggle with editorial dropdown.
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when resizing to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Minimal toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="mobile-menu-btn"
        style={{
          width: "40px",
          height: "40px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1100,
        }}
      >
        <span
          style={{
            color: "var(--color-white)",
            fontSize: "1.5rem",
            lineHeight: 1,
            fontFamily: "var(--font-serif)",
            display: "block",
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
          }}
          aria-hidden="true"
        >
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.2)",
            }}
            aria-hidden="true"
          />

          <nav
            aria-label="Mobile navigation"
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              right: 0,
              zIndex: 1100,
              background: "var(--color-bg)",
              minWidth: "180px",
              padding: "var(--space-md) 0",
              border: "1px solid var(--color-border)",
            }}
          >
            <MobileNavLink href="/rooms" onClick={() => setIsOpen(false)}>
              Rooms
            </MobileNavLink>
            <MobileNavLink href="/#location" onClick={() => setIsOpen(false)}>
              Location
            </MobileNavLink>
            <MobileNavLink href="/#about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
          </nav>
        </>
      )}
    </div>
  );
}

// --- Internal link sub-component ---

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: string;
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "0.75rem 1.5rem",
        fontSize: "0.8125rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-text)",
        transition: "color 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color =
          "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
      }}
    >
      {children}
    </Link>
  );
}