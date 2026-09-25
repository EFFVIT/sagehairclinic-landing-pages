"use client";

// RootLogic FAB for the Next.js LP fleet. Drop <Fab client="rhrli" /> once into
// the app's root layout (below the DniSwap mount). It fetches the client's config
// from control at runtime and mounts the shadow-DOM widget on document.body, so
// control edits go live within seconds with no redeploy. Renders nothing itself.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { mountFab } from "./fab-widget";

/* Routes the FAB must never mount on. The consult funnel IS the conversion
   path on /c/consult: a floating "Start Here" panel there competes with the
   booking it is supposed to start, and at 390px it physically covers the first
   question. Found by looking at the rendered page rather than by any check —
   the widget mounts onto document.body from the root layout, so nothing about
   the consult page's own source shows it is there. */
const SUPPRESSED = ["/c/consult"];

export default function Fab({
  client,
  controlOrigin,
}: {
  client: string;
  controlOrigin?: string;
}) {
  const pathname = usePathname();
  const suppressed = SUPPRESSED.some(
    (r) => pathname === r || pathname?.startsWith(`${r}/`)
  );

  useEffect(() => {
    if (suppressed) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    mountFab({ client, controlOrigin }).then((fn) => {
      if (cancelled) fn();
      else cleanup = fn;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  /* `suppressed` belongs in the deps: without it a client-side navigation from
     a page where the FAB is allowed to /c/consult keeps the stale effect and
     the widget stays mounted over the funnel. */
  }, [client, controlOrigin, suppressed]);

  return null;
}
