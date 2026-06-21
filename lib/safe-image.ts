// Guards image URLs that get interpolated into CSS `url("...")` (background-image).
// Even though product/hero image_url values come from authenticated admin uploads,
// validating them render-side prevents any CSS-injection / url() breakout if a value
// ever contains CSS-breaking characters. Allows local public assets and the configured
// Supabase Storage origin only; anything else falls back.

const SUPABASE_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").origin;
  } catch {
    return "";
  }
})();

// Characters that could break out of a CSS url("...") declaration.
const CSS_UNSAFE = /["')(\\<>\s]/;

export function safeImageUrl(
  url: string | null | undefined,
  fallback = ""
): string {
  if (!url) return fallback;

  // Local public asset, e.g. /images/foo.png
  if (url.startsWith("/")) {
    return CSS_UNSAFE.test(url) ? fallback : url;
  }

  // Remote: must be https on the configured Supabase origin, with no CSS-breaking chars.
  try {
    const u = new URL(url);
    if (
      u.protocol === "https:" &&
      SUPABASE_ORIGIN &&
      u.origin === SUPABASE_ORIGIN &&
      !CSS_UNSAFE.test(url)
    ) {
      return url;
    }
  } catch {
    /* not a valid absolute URL */
  }

  return fallback;
}
