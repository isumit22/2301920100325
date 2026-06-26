import { API_BASE_URL, getAuthorizationHeader } from "../config/api";
import { logFrontend } from "../middleware/logger";

export async function fetchNotifications({
  limit = 10,
  page = 1,
  notificationType = "All",
} = {}) {
  const params = new URLSearchParams({
    limit: String(Math.max(5, limit)),
    page: String(Math.max(1, page)),
  });

  if (notificationType !== "All") {
    params.set("notification_type", notificationType);
  }

  await logFrontend(
    "info",
    "utils",
    `requesting notifications page ${page}, limit ${limit}, type ${notificationType}`,
  );

  const response = await fetch(`${API_BASE_URL}/notifications?${params}`, {
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (!response.ok) {
    await logFrontend(
      "error",
      "utils",
      `notifications request failed with status ${response.status}`,
    );
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  await logFrontend(
    "info",
    "utils",
    `notifications request succeeded with ${data.notifications?.length ?? 0} returned items`,
  );

  return data;
}
