"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { shouldStartNavigationProgress } from "@/lib/navigation/should-start-navigation-progress";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 360;
const FINISH_MS = 240;

export function SiteNavigationProgress() {
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const [phase, setPhase] = useState("idle");
 const pendingRef = useRef(false);
 const startedAtRef = useRef(0);
 const finishTimerRef = useRef(null);
 const idleTimerRef = useRef(null);

 const isAdmin = pathname?.startsWith("/admin");

 const completeProgress = useCallback(() => {
  if (!pendingRef.current) return;

  const elapsed = Date.now() - startedAtRef.current;
  const waitMs = Math.max(0, MIN_VISIBLE_MS - elapsed);

  if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
  finishTimerRef.current = setTimeout(() => {
   pendingRef.current = false;
   setPhase("finishing");

   if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
   idleTimerRef.current = setTimeout(() => setPhase("idle"), FINISH_MS);
  }, waitMs);
 }, []);

 useEffect(() => {
  completeProgress();
 }, [pathname, searchParams, completeProgress]);

 useEffect(() => {
  if (isAdmin) return undefined;

  const onClick = (event) => {
   if (event.defaultPrevented) return;
   if (event.button !== 0) return;
   if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

   const anchor = event.target.closest("a[href]");
   if (
    !shouldStartNavigationProgress(anchor, {
     pathname,
     searchParams,
     origin: window.location.origin,
    })
   ) {
    return;
   }

   if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
   if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

   pendingRef.current = true;
   startedAtRef.current = Date.now();
   setPhase("running");
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
 }, [isAdmin, pathname, searchParams]);

 useEffect(() => {
  const root = document.documentElement;
  if (phase !== "idle" && !isAdmin) {
   root.dataset.navigating = "true";
  } else {
   delete root.dataset.navigating;
  }

  return () => {
   delete root.dataset.navigating;
  };
 }, [phase, isAdmin]);

 useEffect(
  () => () => {
   if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
   if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  },
  []
 );

 if (isAdmin || phase === "idle") return null;

 return (
  <div
   className="pointer-events-none fixed inset-x-0 top-0 z-130 h-0.75 overflow-hidden bg-charcoal/6"
   role="progressbar"
   aria-hidden
   aria-valuemin={0}
   aria-valuemax={100}
   aria-valuenow={phase === "finishing" ? 100 : undefined}
  >
   <div
    className={cn(
     "h-full w-full origin-left bg-kalif-blue shadow-[0_0_10px_rgb(58_111_165/40%)] will-change-transform",
     phase === "running" &&
     "motion-reduce:animate-none animate-[site-nav-progress-run_1.8s_cubic-bezier(0.22,1,0.36,1)_forwards]",
     phase === "finishing" &&
     "motion-reduce:animate-none animate-[site-nav-progress-complete_240ms_ease-out_forwards]"
    )}
   />
  </div>
 );
}