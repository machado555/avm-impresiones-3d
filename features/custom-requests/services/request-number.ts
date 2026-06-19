export function createRequestNumber() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const entropy = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `REQ-${yyyy}${mm}${dd}-${entropy}`;
}
