export function normalizeRedirectTo(value: FormDataEntryValue | string | null | undefined, fallback = "/panel") {
  const redirectTo = String(value ?? fallback);

  if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return fallback;
  }

  return redirectTo;
}
