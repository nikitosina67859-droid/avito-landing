// =============================================================
// АНАЛИТИКА
// Здесь собраны все точки для подключения Яндекс Метрики и VK Pixel.
// =============================================================

export type AnalyticsEvent =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "messenger_open"
  | "case_view"
  | "scroll_50"
  | "scroll_90";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function captureUtm() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  let found = false;
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      found = true;
    }
  });
  if (found) {
    localStorage.setItem("utm_data", JSON.stringify(utm));
  }
}

export function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("utm_data");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function tellYandex(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  const w = window as unknown as { ym?: (...args: unknown[]) => void };
  if (typeof w.ym === "function") {
    w.ym(0, "reachGoal", event, payload);
  }
}

function tellVk(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  const w = window as unknown as { VK?: { Goal?: (...args: unknown[]) => void } };
  if (w.VK?.Goal) {
    w.VK.Goal(event, payload);
  }
}

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const utm = getUtm();
  const fullPayload = { ...payload, ...utm };
  console.debug("[analytics]", event, fullPayload);
  tellYandex(event, fullPayload);
  tellVk(event, fullPayload);
}

export function initScrollTracking() {
  if (typeof window === "undefined") return () => {};
  let sent50 = false;
  let sent90 = false;

  const handler = () => {
    const scrolled =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (!sent50 && scrolled >= 50) {
      sent50 = true;
      trackEvent("scroll_50");
    }
    if (!sent90 && scrolled >= 90) {
      sent90 = true;
      trackEvent("scroll_90");
    }
  };

  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}
