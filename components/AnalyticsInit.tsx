"use client";

import { useEffect } from "react";
import Script from "next/script";
import { captureUtm, initScrollTracking } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";

export default function AnalyticsInit() {
  useEffect(() => {
    captureUtm();
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);

  const ymId = siteConfig.analytics.yandexMetrikaId;
  const vkId = siteConfig.analytics.vkPixelId;
  const ymReady = ymId && !ymId.startsWith("ВСТАВИТЬ");
  const vkReady = vkId && !vkId.startsWith("ВСТАВИТЬ");

  return (
    <>
      {ymReady && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${ymId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
          `}
        </Script>
      )}
      {vkReady && (
        <Script id="vk-pixel" strategy="afterInteractive">
          {`
            !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,
            t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){
              VK.Retargeting.Init("${vkId}"); VK.Retargeting.Hit();
            },document.head.appendChild(t)}();
          `}
        </Script>
      )}
    </>
  );
}
