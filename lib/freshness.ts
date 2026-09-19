"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export function useRefreshOnOpen(callback?: () => void) {
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isStale, setIsStale] = useState<boolean>(false);
  const lastFetchRef = useRef<number>(Date.now());
  const hiddenTimestampRef = useRef<number>(0);

  const executeRefresh = useCallback((force = false) => {
    const now = Date.now();
    const elapsed = now - lastFetchRef.current;
    if (!force && elapsed < 30000) return;

    lastFetchRef.current = now;
    const newDate = new Date();
    setLastRefreshed(newDate);
    setIsStale(false);
    try {
      sessionStorage.setItem("last_seen_at", newDate.toISOString());
    } catch {}

    if (callback) callback();
  }, [callback]);

  useEffect(() => {
    executeRefresh(true);
    const handleVis = () => {
      if (document.visibilityState === "hidden") {
        hiddenTimestampRef.current = Date.now();
      } else if (document.visibilityState === "visible") {
        if (Date.now() - hiddenTimestampRef.current > 300000) {
          executeRefresh(true);
        } else {
          executeRefresh(false);
        }
      }
    };
    const handleFocus = () => executeRefresh(false);
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) executeRefresh(true);
      else executeRefresh(false);
    };

    window.addEventListener("visibilitychange", handleVis);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("visibilitychange", handleVis);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [executeRefresh]);

  return { lastRefreshed, isStale, refresh: () => executeRefresh(true) };
}
