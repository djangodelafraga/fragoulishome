// ============================================
// fragoulishome.gr — Security & Privacy Utilities
// Input validation, sanitisation, rate limiting, security headers.
// ============================================

// ============================================
// Input validation
// ============================================

/**
 * Validates an email address format.
 * Returns the email if valid, null otherwise.
 */
export function validateEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const trimmed = email.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return null;
  // Standard email regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) ? trimmed : null;
}

/**
 * Validates a date string in YYYY-MM-DD format.
 * Returns the date string if valid, null otherwise.
 */
export function validateDate(date: unknown): string | null {
  if (typeof date !== "string") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return date;
}

/**
 * Validates that a value is a non-empty string with max length.
 */
export function validateName(name: unknown, maxLength = 100): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  if (trimmed.length < 1 || trimmed.length > maxLength) return null;
  return trimmed;
}

/**
 * Validates a positive integer within a range.
 */
export function validatePositiveInt(
  value: unknown,
  min = 1,
  max = 999_999,
): number | null {
  const num = typeof value === "string" ? Number(value) : (typeof value === "number" ? value : NaN);
  if (isNaN(num) || !Number.isInteger(num)) return null;
  if (num < min || num > max) return null;
  return num;
}

/**
 * Validates a price value (positive number, up to 2 decimal places).
 */
export function validatePrice(price: unknown): number | null {
  const num = typeof price === "number" ? price : Number(price);
  if (isNaN(num) || num < 0 || num > 100_000) return null;
  return Math.round(num * 100) / 100;
}

// ============================================
// XSS sanitisation
// ============================================

/**
 * Strips HTML tags and dangerous characters from untrusted input.
 */
export function sanitizeInput(input: string): string {
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "");
  // Remove script-related patterns
  sanitized = sanitized.replace(/[<>"'&]/g, (char) => {
    switch (char) {
      case "<": return "\\u003c";
      case ">": return "\\u003e";
      case '"': return "\\u0022";
      case "'": return "\\u0027";
      case "&": return "\\u0026";
      default: return char;
    }
  });
  // Limit length to prevent abuse
  return sanitized.slice(0, 5000);
}

// ============================================
// Rate limiting (in-memory)
// ============================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupRateLimitStore(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Checks if a request is within rate limits.
 *
 * @param identifier - Unique identifier (e.g. IP address or user ID)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds (default: 1 minute)
 * @returns true if the request is allowed, false if rate-limited
 */
export async function applyRateLimiting(
  identifier: string,
  limit: number,
  windowMs = 60_000,
): Promise<boolean> {
  cleanupRateLimitStore();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false; // Rate limited
  }

  entry.count++;
  return true;
}

/**
 * Helper to get a client identifier from a request (IP or forwarded-for header).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return "unknown";
}

// ============================================
// Security headers
// ============================================

export interface SecurityHeadersConfig {
  /** Content Security Policy string */
  contentSecurityPolicy?: string;
  /** Enable HSTS (default: 1 year) */
  hsts?: boolean | { maxAge: number; includeSubDomains?: boolean; preload?: boolean };
  /** Frame options (default: DENY) */
  frameOptions?: "DENY" | "SAMEORIGIN";
  /** Referrer policy (default: strict-origin-when-cross-origin) */
  referrerPolicy?: string;
  /** Permissions policy (default: restrictive) */
  permissionsPolicy?: string;
  /** Enable X-Content-Type-Options: nosniff */
  contentTypeOptions?: boolean;
}

/**
 * Returns production-ready security headers as key-value pairs.
 * These can be used in next.config.js headers() or middleware.
 */
export function securityHeaders(config?: SecurityHeadersConfig): Record<string, string> {
  const options: SecurityHeadersConfig = config ?? {};

  const headers: Record<string, string> = {};

  // X-Content-Type-Options
  if (options.contentTypeOptions !== false) {
    headers["X-Content-Type-Options"] = "nosniff";
  }

  // X-Frame-Options
  const frameOption = options.frameOptions ?? "DENY";
  headers["X-Frame-Options"] = frameOption;

  // Referrer-Policy
  headers["Referrer-Policy"] = options.referrerPolicy ?? "strict-origin-when-cross-origin";

  // Permissions-Policy (restrictive by default)
  headers["Permissions-Policy"] = options.permissionsPolicy ??
    "accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()";

  // Content-Security-Policy
  if (options.contentSecurityPolicy) {
    headers["Content-Security-Policy"] = options.contentSecurityPolicy;
  } else {
    // Default CSP (sensible for Next.js + Supabase + Stripe + OpenStreetMap)
    headers["Content-Security-Policy"] = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://*.supabase.co",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.supabase.co https://*.openstreetmap.org https://*.stripe.com",
      "font-src 'self'",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://*.openstreetmap.org",
      "object-src 'none'",
    ].join("; ");
  }

  // Strict-Transport-Security (HSTS)
  const hstsRaw = options.hsts;
  if (hstsRaw !== false) {
    const maxAge = typeof hstsRaw === "object" && hstsRaw !== null ? (hstsRaw as { maxAge?: number }).maxAge ?? 31536000 : 31536000;
    const includeSubDomains = typeof hstsRaw === "object" && hstsRaw !== null ? (hstsRaw as { includeSubDomains?: boolean }).includeSubDomains ?? true : true;
    const preload = typeof hstsRaw === "object" && hstsRaw !== null ? (hstsRaw as { preload?: boolean }).preload ?? false : false;
    let hstsValue = `max-age=${maxAge}`;
    if (includeSubDomains) hstsValue += "; includeSubDomains";
    if (preload) hstsValue += "; preload";
    headers["Strict-Transport-Security"] = hstsValue;
  }

  return headers;
}