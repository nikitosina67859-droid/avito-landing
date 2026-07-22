import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-base-black border-t border-white/5 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start leading-tight">
          <span className="font-display uppercase text-base text-white">
            {siteConfig.brand.name}
          </span>
          <span className="font-mono text-[10px] text-ink-gray">
            {siteConfig.brand.tagline}
          </span>
        </div>
        <p className="font-mono text-xs text-ink-gray text-center">
          © {new Date().getFullYear()} {siteConfig.brand.specialistName}. Все
          права защищены.
        </p>
      </div>
    </footer>
  );
}
