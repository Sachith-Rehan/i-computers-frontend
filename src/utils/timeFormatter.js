export function formatDateTime(timestamp) {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}