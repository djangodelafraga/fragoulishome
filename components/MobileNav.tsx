// ============================================
// fragoulishome.gr — MobileNav
// Round hamburger button on mobile that reveals
// a dropdown with Rooms, Location, About links.
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
      {/* Round toggle button — hidden on desktop via CSS */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="mobile-menu-btn"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          border: "none",
          cursor: "pointer",
          display: "none", // toggled to flex by .mobile-menu-btn in CSS
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1100,
          transition: "background 0.2s",
        }}
      >
        {/* Icon: hamburger / close — user will replace with PNG later */}
        <span
          style={{
            color: "var(--color-white)",
            fontSize: "1.25rem",
            lineHeight: 1,
            fontFamily: "var(--font-sans)",
            display: "block",
          }}
          aria-hidden="true"
        >
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Semi-transparent backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.3)",
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
              background: "var(--color-white)",
              borderRadius: "4px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              minWidth: "200px",
              padding: "var(--space-xs) 0",
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
        fontSize: "0.9375rem",
        color: "var(--color-text)",
        transition: "background 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background =
          "var(--color-bg-alt)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
}