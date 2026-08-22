// ============================================
// fragoulishome.gr — Admin Layout
// This is a minimal layout that delegates to the
// appropriate sub-layout. The login page has its own
// layout without auth guard; all other admin pages
// use the protected dashboard layout.
// ============================================

import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}