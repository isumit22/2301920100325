export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://4.224.186.213/evaluation-service";

export function getAuthorizationHeader() {
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  if (!token) {
    return {};
  }

  return {
    Authorization: `${import.meta.env.VITE_TOKEN_TYPE ?? "Bearer"} ${token}`,
  };
}
