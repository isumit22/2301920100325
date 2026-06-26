import { API_BASE_URL, getAuthorizationHeader } from "../config/api";

const validStacks = new Set(["frontend", "backend"]);
const validLevels = new Set(["debug", "info", "warn", "error", "fatal"]);
const validPackages = new Set(["auth", "config", "middleware", "utils"]);

function assertAllowedValue(name, value, allowedValues) {
  if (!allowedValues.has(value)) {
    throw new Error(`Invalid log ${name}: ${value}`);
  }
}

export async function Log(stack, level, packageName, message) {
  assertAllowedValue("stack", stack, validStacks);
  assertAllowedValue("level", level, validLevels);
  assertAllowedValue("package", packageName, validPackages);

  const response = await fetch(`${API_BASE_URL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify({
      stack,
      level,
      package: packageName,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Log request failed with status ${response.status}`);
  }

  return response.json();
}

export function logFrontend(level, packageName, message) {
  return Log("frontend", level, packageName, message).catch(() => undefined);
}
