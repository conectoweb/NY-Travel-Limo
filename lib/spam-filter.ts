export const SPAM_ERROR_MESSAGE =
  "Please remove promotional or marketing content and submit a transportation-related quote request.";

// Hard-block phrases targeting unsolicited SEO, advertising, AI agency,
// backlink, website development, and ranking solicitations.
// Generic single words (e.g., performance, search, improve, AI, website, Google)
// are never blocked on their own.
const spamPatterns: RegExp[] = [
  // SEO and obfuscated SEO variants (e.g., SEO, S.E.O, S-E-O, S E O)
  /\bseo\b/,
  /\bs\s+e\s+o\b/,
  /\bsearch engine optimization\b/,
  /\blocal seo\b/,
  /\btechnical seo\b/,
  /\bseo (?:audit|report|services?|agency|experts?|strategy|packages?|optimization)\b/,

  // Digital marketing, paid ads, and lead generation offers
  /\b(?:digital|performance|content|online|social media)\s+marketing\b/,
  /\bmarketing\s+(?:agenc(?:y|ies)|services?|solutions?|campaigns?|strategy|experts?)\b/,
  /\bgoogle ads?\b/,
  /\badwords\b/,
  /\bppc\b/,
  /\bpay per click\b/,
  /\bmeta ads?\b/,
  /\bfacebook ads?\b/,
  /\blead generation services?\b/,

  // Backlinks, guest posts, and link-building solicitations
  /\bbacklinks?\b/,
  /\bbacklink outreach\b/,
  /\blink building\b/,
  /\blink exchange\b/,
  /\bguest posts?\b/,
  /\bguest posting\b/,
  /\bsponsored posts?\b/,

  // Search ranking and traffic pitches
  /\b(?:improve|increase|boost|higher|guarantee)\s+(?:your\s+)?(?:google\s+)?(?:search\s+)?rankings?\b/,
  /\bsearch rankings?\b/,
  /\bgoogle (?:maps )?rankings?\b/,
  /\bnot ranking on google\b/,
  /\bmove up (?:in|on) (?:the )?google rankings?\b/,
  /\b(?:organic|website)\s+traffic\b/,
  /\b(?:increase|boost|drive)\s+(?:your\s+|website\s+|site\s+)?traffic\b/,
  /\bkeyword research\b/,
  /\b(?:improve|boost)\s+(?:your\s+)?online visibility\b/,
  /\bguaranteed\s+(?:rankings?|results|traffic|first page)\b/,

  // Website audits, optimization, and development pitches
  /\b(?:website|site)\s+audit\b/,
  /\b(?:free|complimentary)\s+(?:website|site|marketing)\s+(?:audit|report|analysis)\b/,
  /\bgoogle business profile optimization\b/,
  /\b(?:improve|design|redesign|develop|upgrade|optimize)\s+(?:your|the)\s+(?:website|web site|online presence)\b/,
  /\bwebsite optimization\b/,
  /\bweb design services?\b/,
  /\bwebsite development services?\b/,

  // AI, LLM, and GEO marketing pitches
  /\bai\s+(?:marketing|agenc(?:y|ies))\b/,
  /\b(?:ai|ai powered|ai driven)\s+(?:automation|search|optimization)\s+services?\b/,
  /\bartificial intelligence services?\b/,
  /\bgenerative ai services?\b/,
  /\bllm services?\b/,
  /\b(?:llm|llms|geo)\s+(?:search|optimization|marketing|services?|solutions?)\b/,
  /\bgenerative engine optimization\b/,
  /\bintelligent\s+(?:search|marketing|optimization|advertising|services?|solutions?)\b/,
];

// Soft promotional signals that are benign individually in travel requests
// (e.g., "Broadway performance", "AI conference", "improve pickup time")
// but indicate spam when combined together with promotional context terms.
const softSignalPatterns: RegExp[] = [
  /\bperformance\b/,
  /\bperforming\b/,
  /\bmissing\b/,
  /\bsearches?\b/,
  /\bimprove\b/,
  /\bbetter\b/,
  /\bupgrade\b/,
  /\bposition\b/,
  /\bgeo\b/,
  /\bartificial\b/,
  /\bintelligent\b/,
  /\bai\b/,
];

const promotionalContextPatterns: RegExp[] = [
  /\bwebsite\b/,
  /\bgoogle\b/,
  /\bbusiness\b/,
  /\brankings?\b/,
  /\btraffic\b/,
  /\bservices?\b/,
];

function normalizeSpamText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Replace punctuation and symbols with spaces so "S.E.O." or "S-E-O" becomes "s e o".
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function containsSpam(text: unknown): boolean {
  if (typeof text !== "string" || !text.trim()) return false;

  const normalizedText = normalizeSpamText(text);

  if (spamPatterns.some((pattern) => pattern.test(normalizedText))) {
    return true;
  }

  // Block when two or more soft promotional signals appear together
  // alongside a promotional context term (website, Google, business, rankings, traffic, services).
  const softSignalCount = softSignalPatterns.reduce(
    (count, pattern) => (pattern.test(normalizedText) ? count + 1 : count),
    0,
  );
  if (softSignalCount >= 2) {
    const hasPromotionalContext = promotionalContextPatterns.some((pattern) =>
      pattern.test(normalizedText),
    );
    if (hasPromotionalContext) {
      return true;
    }
  }

  return false;
}
