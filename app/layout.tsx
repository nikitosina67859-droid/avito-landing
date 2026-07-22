import type { Metadata } from "next";
import { Oswald, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsInit from "@/components/AnalyticsInit";
import { siteConfig } from "@/lib/config";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.brand.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 1600 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: siteConfig.brand.name,
      description: siteConfig.seo.description,
      areaServed: "RU",
      url: siteConfig.seo.url,
      image: siteConfig.seo.ogImage,
      priceRange: "Бесплатный разбор",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Разбор действительно бесплатный?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да. Разбор ничего не стоит и ни к чему не обязывает.",
          },
        },
        {
          "@type": "Question",
          name: "Гарантированы ли 15 заявок?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Количество заявок зависит от спроса, региона, предложения, бюджета и работы отдела продаж. На разборе мы найдём точки роста и составим план, который может помочь получить до 15 дополнительных обращений после внедрения.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${oswald.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
