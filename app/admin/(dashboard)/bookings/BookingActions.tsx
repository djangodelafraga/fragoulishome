// ============================================
// fragoulishome.gr — BookingActions
// Client component for booking status management.
// ============================================

"use client";

import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/lib/supabaseClient";
import type { BookingStatus, PaymentStatus } from "@/types/database";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
  currentPaymentStatus?: string;
}

export default function BookingActions({
  bookingId,
  currentStatus,
  currentPaymentStatus,
}: BookingActionsProps) {
  const router = useRouter();

  async function handleStatusChange(newStatus: BookingStatus) {
    const actionLabels: Record<string, string> = {
      confirmed: "confirm",
      cancelled: "cancel",
      completed: "mark as completed",
      rejected: "reject",
    };

    if (!confirm(`Are you sure you want to ${actionLabels[newStatus] ?? newStatus} this booking?`)) return;

    let paymentStatus: PaymentStatus | undefined;
    if (newStatus === "confirmed") {
      paymentStatus = "succeeded";
    } else if (newStatus === "cancelled" || newStatus === "rejected") {
      paymentStatus = "failed";
    }

    const result = await updateBookingStatus(bookingId, newStatus, paymentStatus);
    if (result) {
      router.refresh();
    }
  }

  const canConfirm = currentStatus === "pending";
  const canCancel = currentStatus === "pending" || currentStatus === "confirmed";
  const canComplete = currentStatus === "confirmed";
  const canReject = currentStatus === "pending";

  return (
    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
      {canConfirm && (
        <ActionButton label="Confirm" color="#065f46" onClick={() => handleStatusChange("confirmed")} />
      )}
      {canComplete && (
        <ActionButton label="Complete" color="#1e40af" onClick={() => handleStatusChange("completed")} />
      )}
      {canCancel && (
        <ActionButton label="Cancel" color="#991b1b" onClick={() => handleStatusChange("cancelled")} />
      )}
      {canReject && (
        <ActionButton label="Reject" color="#991b1b" onClick={() => handleStatusChange("rejected")} />
      )}
      {!canConfirm && !canCancel && !canComplete && !canReject && (
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>—</span>
      )}
    </div>
  );
}

// --- Sub-component ---

function ActionButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.25rem 0.5rem",
        fontSize: "0.6875rem",
        fontWeight: 500,
        color,
        background: "transparent",
        border: `1px solid ${color}`,
        borderRadius: "2px",
        cursor: "pointer",
        lineHeight: 1.4,
        fontFamily: "inherit",
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = color;
        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = color;
      }}
    >
      {label}
    </button>
  );
}