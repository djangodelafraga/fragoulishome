// ============================================
// fragoulishome.gr — RoomForm
// Client component for creating/editing rooms.
// ============================================

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/lib/supabaseClient";

interface RoomFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    pricePerNight: number;
    capacity: number;
    bedType?: string;
    sizeSqm?: number;
    amenities: string[];
    coverImageUrl?: string;
    isActive: boolean;
  };
}

export default function RoomForm({ initialData }: RoomFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription ?? "");
  const [pricePerNight, setPricePerNight] = useState(initialData?.pricePerNight?.toString() ?? "");
  const [capacity, setCapacity] = useState(initialData?.capacity?.toString() ?? "2");
  const [bedType, setBedType] = useState(initialData?.bedType ?? "double");
  const [sizeSqm, setSizeSqm] = useState(initialData?.sizeSqm?.toString() ?? "");
  const [amenities, setAmenities] = useState(initialData?.amenities?.join(", ") ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl ?? "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await createRoom({
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        description,
        shortDescription: shortDescription || undefined,
        pricePerNight: Number(pricePerNight),
        currency: "EUR",
        capacity: Number(capacity),
        bedType: bedType as "single" | "double" | "queen" | "king" | "sofa" | undefined,
        sizeSqm: sizeSqm ? Number(sizeSqm) : undefined,
        amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
        coverImageUrl: coverImageUrl || undefined,
        isActive,
      });

      if (result) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/rooms");
          router.refresh();
        }, 1000);
      } else {
        setError("Failed to create room. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        padding: "var(--space-xl)",
        textAlign: "center",
        background: "#d1fae5",
        border: "1px solid #a7f3d0",
        borderRadius: "2px",
      }}>
        <p style={{ fontSize: "1rem", color: "#065f46", fontWeight: 500 }}>
          Room created successfully! Redirecting...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {error && (
        <div role="alert" style={{
          padding: "var(--space-sm) var(--space-md)",
          fontSize: "0.8125rem",
          color: "#991b1b",
          background: "#fee2e2",
          border: "1px solid #fecaca",
          borderRadius: "2px",
        }}>
          {error}
        </div>
      )}

      <FormField label="Title" required>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </FormField>

      <FormField label="Slug" hint="Leave empty to auto-generate from title">
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="villa-adonis" />
      </FormField>

      <FormField label="Description" required>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} />
      </FormField>

      <FormField label="Short Description">
        <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={2} />
      </FormField>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
        <FormField label="Price per Night (€)" required>
          <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} required min={0} step="0.01" />
        </FormField>

        <FormField label="Capacity" required>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required min={1} />
        </FormField>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
        <FormField label="Bed Type">
          <select value={bedType} onChange={(e) => setBedType(e.target.value)}>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="queen">Queen</option>
            <option value="king">King</option>
            <option value="sofa">Sofa Bed</option>
          </select>
        </FormField>

        <FormField label="Size (sqm)">
          <input type="number" value={sizeSqm} onChange={(e) => setSizeSqm(e.target.value)} min={0} />
        </FormField>
      </div>

      <FormField label="Amenities" hint="Comma-separated list">
        <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="WiFi, Air Conditioning, Kitchen" />
      </FormField>

      <FormField label="Cover Image URL">
        <input type="url" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://..." />
      </FormField>

      <FormField label="Status">
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active (visible on the site)
        </label>
      </FormField>

      <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-md)" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.625rem 1.5rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--color-white)",
            background: loading ? "var(--color-text-muted)" : "var(--color-accent)",
            border: "none",
            borderRadius: "2px",
            cursor: loading ? "not-allowed" : "pointer",
            lineHeight: 1.4,
          }}
        >
          {loading ? "Saving..." : isEditing ? "Update Room" : "Create Room"}
        </button>
        <a
          href="/admin/rooms"
          style={{
            padding: "0.625rem 1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
            background: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "2px",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

// --- Sub-component ---

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>
        {label}
        {required && <span style={{ color: "#991b1b", marginLeft: "0.125rem" }}>*</span>}
      </span>
      {hint && <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.125rem" }}>{hint}</span>}
      {children}
      <style>{`
        input[type="text"], input[type="number"], input[type="url"], textarea, select {
          width: 100%;
          padding: 0.5rem 0.625rem;
          font-size: 0.875rem;
          font-family: var(--font-sans);
          color: var(--color-text);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          line-height: 1.4;
          box-sizing: border-box;
        }
        textarea { resize: vertical; }
      `}</style>
    </label>
  );
}