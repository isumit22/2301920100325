import { useCallback, useEffect, useMemo, useState } from "react";
import { logFrontend } from "../middleware/logger";

const STORAGE_KEY = "viewed-notification-ids";

function readViewedIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useViewedNotifications() {
  const [viewedIds, setViewedIds] = useState(() => new Set(readViewedIds()));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...viewedIds]));
  }, [viewedIds]);

  const markViewed = useCallback((id) => {
    setViewedIds((current) => {
      if (current.has(id)) {
        return current;
      }

      const next = new Set(current);
      next.add(id);
      logFrontend("info", "utils", `notification ${id} marked viewed`);
      return next;
    });
  }, []);

  const clearViewed = useCallback(() => {
    setViewedIds(new Set());
    logFrontend("warn", "utils", "cleared viewed notification state");
  }, []);

  return useMemo(
    () => ({
      viewedIds,
      markViewed,
      clearViewed,
      isViewed: (id) => viewedIds.has(id),
    }),
    [clearViewed, markViewed, viewedIds],
  );
}
