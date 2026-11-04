export const SPAM_ERROR_MESSAGE =
  "Please remove promotional or marketing content and submit a transportation-related quote request.";

const spamPatterns: RegExp[] = [
  // SEO service and ranking pitches
  /\bsearch engine optimization\b/,
  /\bs\s+e\s+o\b/,
  /\bseo\s+(?:services?|agency|experts?|audit|report|strategy|packages?|optimization)\b/,
  /\b(?:improve|boost|increase|guarantee)\s+(?:your\s+)?(?:google\s+)?(?:search\s+)?rankings?\b/,
  /\b(?:increase|boost|drive)\s+(?:your\s+)?(?:website\s+)?traffic\b/,
  /\bnot ranking on google\b/,
  /\bmove up (?:in|on) (?:the )?google rankings\b/,
  /\b(?:improve|boost)\s+(?:your\s+)?online visibility\b/,

  // Digital marketing and advertising offers
  /\b(?:digital|online|content|social media)\s+marketing\s+(?:services?|agency|solutions?|campaigns?|strategy|experts?)\b/,
  /\bmarketing\s+(?:services?|agency|solutions?|campaigns?|strategy|experts?)\b/,
  /\bgoogle ads?\s+(?:management|services?|agency|campaigns?|optimization)\b/,
  /\b(?:manage|optimize|run)\s+(?:your\s+)?google ads?\b/,
  /\bppc\s+(?:services?|agency|management|campaigns?)\b/,
  /\bpay per click\s+(?:services?|management|campaigns?)\b/,

  // Link-building and guest-post offers
  /\bbacklinks?\b/,
  /\blink building\b/,
  /\bguest posts?\b/,
  /\bguest posting\b/,
  /\blink exchange\b/,

  // Website design and upgrade pitches
  /\b(?:design|redesign|develop|upgrade|optimize)\s+(?:your\s+|the\s+)?(?:website|web site|online presence)\b/,
  /\b(?:website|web site)\s+(?:design|redesign|development|upgrade|optimization)\s+(?:services?|solutions?|packages?|agency)\b/,

  // AI, LLM, and GEO marketing pitches
  /\bartificial intelligence\b/,
  /\b(?:ai powered|ai driven)\s+(?:seo|search|marketing|optimization|services?|solutions?)\b/,
  /\b(?:llm|llms|geo)\s+(?:seo|search|optimization|marketing|services?|solutions?)\b/,
  /\bgenerative engine optimization\b/,
  /\bintelligent\s+(?:seo|search|marketing|optimization|advertising|solutions?|services?)\b/,

  // Promotional audit and report offers
  /\b(?:free|complimentary)\s+(?:seo|website|marketing)\s+(?:audit|report|analysis)\b/,
  /\b(?:seo|marketing)\s+(?:audit|report|analysis)\b/,
  /\bguaranteed\s+(?:rankings?|results|traffic|first page)\b/,
];

function normalizeSpamText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Replace punctuation and symbols with spaces, so “S.E.O.” becomes “s e o”.
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function containsSpam(text: unknown): boolean {
  if (typeof text !== "string" || !text.trim()) return false;

  const normalizedText = normalizeSpamText(text);
  return spamPatterns.some((pattern) => pattern.test(normalizedText));
}