import React from "react";

/**
 * Parses markdown-style links [Anchor Text](/target-url) inside strings
 * and renders them as semantic, accessible, brand-styled anchor elements.
 */
export default function FormattedText({
  text,
  className = "font-semibold text-brand-accent underline decoration-brand-secondary decoration-2 underline-offset-4 transition-colors hover:text-brand-primary hover:decoration-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs",
}: {
  text: string;
  className?: string;
}) {
  if (!text || !text.includes("[")) {
    return <>{text}</>;
  }

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isAbsolute = /^https?:\/\//i.test(href);
    const isInternalSite =
      href.startsWith("https://www.nytravellimo.com") ||
      href.startsWith("http://www.nytravellimo.com") ||
      href.startsWith("https://nytravellimo.com") ||
      href.startsWith("http://nytravellimo.com");

    const isExternal = isAbsolute && !isInternalSite;

    // Links belonging or related to NY Travel Limo (social profiles, Google Maps, reservation) maintain follow status
    const lowerHref = href.toLowerCase();
    const isBrandRelated =
      lowerHref.includes("nytravellimo") ||
      lowerHref.includes("newyorktravellimo") ||
      lowerHref.includes("maps.app.goo.gl") ||
      lowerHref.includes("goo.gl/maps") ||
      lowerHref.includes("google.com/maps");

    const shouldNofollow = isExternal && !isBrandRelated;

    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        className={className}
        {...(isExternal
          ? {
              target: "_blank",
              rel: shouldNofollow ? "noopener noreferrer nofollow" : "noopener noreferrer",
            }
          : {})}
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
