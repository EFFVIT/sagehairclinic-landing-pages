"use client";

// RootLogic FAB for the Next.js LP fleet. Drop <Fab client="rhrli" /> once into
// the app's root layout (below the DniSwap mount). It fetches the client's config
// from control at runtime and mounts the shadow-DOM widget on document.body, so
// control edits go live within seconds with no redeploy. Renders nothing itself.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mountFab } from "./fab-widget";

/* Routes the FAB must never mount on. The consult funnel IS the conversion
   path on /c/consult: a floating "Start Here" panel there competes with the
   booking it is supposed to start, and at 390px it physically covers the first
   question. Found by looking at the rendered page rather than by any check —
   the widget mounts onto document.body from the root layout, so nothing about
   the consult page's own source shows it is there. */
const SUPPRESSED = ["/c/consult"];

/* The same rule, one layer in. The hero scheduler is the booking UI on every
   /c and /m page, and it is revealed mid-page rather than by navigating, so a
   route list cannot express it. Measured on the live page at 390px: the FAB's
   greeting panel renders 298x108 directly over the time grid and covers five
   time buttons, which is the /c/consult failure exactly. HeroScheduler emits
   this event on mount and unmount; the FAB unmounts while it is open. The
   phone is not lost — the scheduler carries its own "Call ..." and "Or have us
   call you" links, which is all the Sage FAB offered. */
const SCHEDULER_EVENT = "shc:scheduler";

export default function Fab({
  client,
  controlOrigin,
}: {
  client: string;
  controlOrigin?: string;
}) {
  const pathname = usePathname();
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    const onScheduler = (e: Event) => {
      setSchedulerOpen(Boolean((e as CustomEvent<{ open?: boolean }>).detail?.open));
    };
    window.addEventListener(SCHEDULER_EVENT, onScheduler);
    return () => window.removeEventListener(SCHEDULER_EVENT, onScheduler);
  }, []);

  const suppressed =
    schedulerOpen ||
    SUPPRESSED.some((r) => pathname === r || pathname?.startsWith(`${r}/`));

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
