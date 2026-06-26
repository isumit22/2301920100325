import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { logFrontend } from "../middleware/logger";

const DEFAULT_LIMIT = 10;

export function useNotifications({
  filter = "All",
  page = 1,
  limit = DEFAULT_LIMIT,
} = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchNotifications({
          limit,
          page,
          notificationType: filter,
        });
        const allNotifications = data.notifications ?? [];

        if (!ignore) {
          setNotifications(allNotifications);
          setHasNextPage(allNotifications.length === limit);
          await logFrontend(
            "debug",
            "utils",
            `rendering page ${page} with filter ${filter} and ${allNotifications.length} returned notifications`,
          );
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to load notifications");
          await logFrontend(
            "error",
            "utils",
            `unable to load notifications: ${err.message || "unknown error"}`,
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [filter, limit, page]);

  return { notifications, hasNextPage, loading, error };
}
