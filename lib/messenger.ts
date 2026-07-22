import { siteConfig } from "./config";
import { trackEvent } from "./analytics";

export async function openMessenger(customMessage?: string) {
  const message = customMessage || siteConfig.prefilledMessage;

  try {
    await navigator.clipboard.writeText(message);
  } catch {
    // буфер обмена недоступен — не критично
  }

  trackEvent("messenger_open");

  if (
    siteConfig.messengerLink &&
    !siteConfig.messengerLink.startsWith("ВСТАВИТЬ")
  ) {
    window.open(siteConfig.messengerLink, "_blank", "noopener,noreferrer");
  } else {
    console.warn(
      "[messenger] Укажите ссылку на личные сообщения в lib/config.ts (siteConfig.messengerLink)"
    );
  }
}
