export const SPAM_ERROR_MESSAGE =
  "Please remove promotional or marketing content and submit a transportation-related quote request.";

/**
 * Patterns matching unsolicited SEO and marketing solicitations.
 * Case-insensitive, matches whole words/phrases with variations in whitespace and punctuation.
 * Designed to strictly avoid false positives on legitimate transportation requests.
 */
const spamPatterns: RegExp[] = [
  /\bseo\b/i,
  /\bs[\s.\-_]+e[\s.\-_]+o\b/i,
  /\bsearch[\s.\-_]+engine[\s.\-_]+optimization\b/i,
  /\bmarketing\b/i,
  /\bdigital[\s.\-_]+marketing\b/i,
  /\bbacklinks?\b/i,
  /\blink[\s.\-_]+building\b/i,
  /\bguest[\s.\-_]+posts?\b/i,
  /\bimprove[\s.\-_]+rankings?\b/i,
  /\bincrease[\s.\-_]+traffic\b/i,
];

export function containsSpam(text: unknown): boolean {
  if (typeof text !== "string") return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  return spamPatterns.some((pattern) => pattern.test(trimmed));
}

