"use client";

// ============================================
// fragoulishome.gr — AdminCalendarClient
// Client component rendering a year-view calendar
// where admins can click dates to block/unblock availability.
// ============================================

import { useState, useEffect, useCallback } from "react";
import type { Room } from "@/types/database";
import type { Availability } from "@/types/database";

interface AdminCalendarClientProps {
  rooms: Room[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AdminCalendarClient({ rooms }: AdminCalendarClientProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id ?? "");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [availability, setAvailability] = useState<Map<string, Availability>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  // Fetch availability for the entire year
  const fetchAvailability = useCallback(async () => {
    if (!selectedRoomId) return;
    setLoading(true);
    try {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      const res = await fetch(
        `/api/availability/check?roomId=${selectedRoomId}&checkIn=${startDate}&checkOut=${endDate}`,
      );
      const json = await res.json();
      if (json.data?.dates) {
        const map = new Map<string, Availability>();
        for (const d of json.data.dates as Availability[]) {
          map.set(d.date, d);
        }
        setAvailability(map);
      }
    } catch (err) {
      console.error("Failed to fetch availability:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedRoomId, year]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Toggle a date's availability
  async function toggleDate(dateStr: string, current: Availability | undefined) {
    if (updating) return;
    setUpdating(dateStr);

    const isAvailable = current ? !current.isAvailable : false; // toggle: if no record, default available -> blocked

    try {
      const res = await fetch("/api/availability/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoomId,
          date: dateStr,
          isAvailable,
          reason: "blocked",
        }),
      });
      const json = await res.json();
      if (json.data) {
        // Update local state
        setAvailability((prev) => {
          const next = new Map(prev);
          if (isAvailable) {
            next.delete(dateStr);
          } else {
            next.set(dateStr, {
              id: "",
              roomId: selectedRoomId,
              date: dateStr,
              isAvailable: false,
              reason: "blocked",
            });
          }
          return next;
        });
        setMessage(`${dateStr} marked as ${isAvailable ? "available" : "blocked"}`);
      } else {
        setMessage(`Error: ${json.error ?? "Unknown error"}`);
      }
    } catch (err) {
      setMessage("Network error updating availability");
    } finally {
      setUpdating(null);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  // Generate month grids
  function renderMonthGrid(monthIndex: number) {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const startPad = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const cells: React.ReactNode[] = [];

    // Day headers
    for (const day of DAYS) {
      cells.push(
        <div key={`header-${monthIndex}-${day}`} style={{
          fontSize: "0.625rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--color-text-muted)",
          textAlign: "center",
          padding: "2px 0",
        }}>
          {day}
        </div>,
      );
    }

    // Empty cells before first day
    for (let i = 0; i < startPad; i++) {
      cells.push(<div key={`pad-${monthIndex}-${i}`} />);
    }

    // Day cells
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const av = availability.get(dateStr);
      const isAvailable = av ? av.isAvailable : true; // default available
      const isToday = dateStr === todayStr;
      const isUpdating = updating === dateStr;

      // Blocked/booked dates
      const isBlocked = av && !av.isAvailable;

      cells.push(
        <button
          key={dateStr}
          onClick={() => toggleDate(dateStr, av)}
          disabled={isUpdating}
          aria-label={`${dateStr} — ${isAvailable ? "Available" : "Blocked"}. Click to toggle.`}
          title={isBlocked ? `Blocked (${av?.reason ?? "blocked"})` : "Available"}
          style={{
            width: "100%",
            aspectRatio: "1",
            border: `1px solid ${isToday ? "var(--color-accent)" : "transparent"}`,
            borderRadius: "2px",
            background: isUpdating
              ? "var(--color-bg-alt)"
              : isBlocked
                ? "#fca5a5" // red for blocked
                : "#d1fae5", // green for available
            color: isBlocked ? "#7f1d1d" : "#065f46",
            fontSize: "0.6875rem",
            fontWeight: isToday ? 700 : 400,
            cursor: isUpdating ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.15s",
            opacity: isUpdating ? 0.5 : 1,
            padding: 0,
            lineHeight: 1,
          }}
        >
          {day}
        </button>,
      );
    }

    return (
      <div key={monthIndex} style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px",
        minWidth: "220px",
      }}>
        {cells}
      </div>
    );
  }

  // Render calendar for first 6 months or all 12 on larger screens
  const monthsToShow = year === new Date().getFullYear() ? 6 : 12;

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: "flex",
        gap: "var(--space-md)",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "var(--space-lg)",
      }}>
        {/* Room selector */}
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
          <span>Room:</span>
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            style={{
              padding: "0.375rem 0.5rem",
              fontSize: "0.875rem",
              border: "1px solid var(--color-border)",
              borderRadius: "2px",
              background: "var(--color-white)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </label>

        {/* Year selector */}
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
          <span>Year:</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{
              padding: "0.375rem 0.5rem",
              fontSize: "0.875rem",
              border: "1px solid var(--color-border)",
              borderRadius: "2px",
              background: "var(--color-white)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {[2026, 2027, 2028].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>

        {/* Legend */}
        <div style={{ display: "flex", gap: "var(--space-md)", fontSize: "0.75rem", color: "var(--color-text-muted)", marginLeft: "auto" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ width: 12, height: 12, background: "#d1fae5", display: "inline-block", border: "1px solid #bbb" }} />
            Available
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ width: 12, height: 12, background: "#fca5a5", display: "inline-block", border: "1px solid #bbb" }} />
            Blocked
          </span>
        </div>
      </div>

      {/* Status message */}
      {message && (
        <div style={{
          padding: "0.5rem 1rem",
          marginBottom: "var(--space-md)",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "2px",
          fontSize: "0.8125rem",
          color: "var(--color-text)",
        }}>
          {message}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Loading availability data...
        </p>
      )}

      {/* Month grids */}
      {!loading && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "var(--space-xl)",
        }}>
          {MONTHS.slice(0, monthsToShow).map((monthName, i) => (
            <div key={i}>
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.9375rem",
                marginBottom: "var(--space-sm)",
                color: "var(--color-text)",
              }}>
                {monthName} {year}
              </h3>
              {renderMonthGrid(i)}
            </div>
          ))}
        </div>
      )}

      {/* Click instruction */}
      <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-lg)" }}>
        Click a date to toggle between available (green) and blocked (red). Blocked dates cannot be booked.
      </p>
    </div>
  );
}