"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.socialLinks.github },
  { label: "Twitter", href: siteConfig.socialLinks.twitter },
  { label: "LinkedIn", href: siteConfig.socialLinks.linkedin },
  { label: "Email", href: `mailto:${siteConfig.socialLinks.email}` },
];

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.socialLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${siteConfig.socialLinks.email}`;
    }
  };

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6">
        <div className="hairline-footer" />

        <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) =>
              link.label === "Email" ? (
                <button
                  key={link.label}
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                  {copied && (
                    <Check
                      size={14}
                      className="text-[var(--accent)] animate-in zoom-in"
                    />
                  )}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
