import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { containsSpam, SPAM_ERROR_MESSAGE } from "./spam-filter.ts";

describe("containsSpam", () => {
  it("exports the expected promotional error message", () => {
    assert.equal(
      SPAM_ERROR_MESSAGE,
      "Please remove promotional or marketing content and submit a transportation-related quote request.",
    );
  });

  it("blocks all required solicitation examples", () => {
    const blockedExamples = [
      "Your website is missing SEO and needs better Google rankings.",
      "We can improve your business performance with Google Ads.",
      "Our marketing agency offers backlink outreach and link building.",
      "Upgrade your website with AI automation and improve search rankings.",
      "We noticed your Google position is weak and can increase traffic.",
    ];

    for (const message of blockedExamples) {
      assert.equal(
        containsSpam(message),
        true,
        `Expected message to be blocked: "${message}"`,
      );
    }
  });

  it("blocks obfuscated SEO variants and hard-block phrases", () => {
    const obfuscatedAndHardBlock = [
      "Can we talk about S.E.O for your business?",
      "Offer for S-E-O and organic traffic.",
      "Boost your S E O and keyword research.",
      "Free website audit and Google Business Profile optimization.",
      "We provide artificial intelligence services and LLM services.",
      "Web design services and website development services available.",
      "Meta Ads, Facebook Ads, PPC, and AdWords management.",
      "Guest post and sponsored post opportunities.",
    ];

    for (const message of obfuscatedAndHardBlock) {
      assert.equal(
        containsSpam(message),
        true,
        `Expected hard-block phrase to be blocked: "${message}"`,
      );
    }
  });

  it("blocks messages combining 2+ soft promotional signals with promotional context", () => {
    assert.equal(
      containsSpam("We noticed your Google position is weak and needs better performance."),
      true,
    );
    assert.equal(
      containsSpam("Your website is missing better search performance."),
      true,
    );
  });

  it("accepts all legitimate transportation quote examples", () => {
    const acceptedExamples = [
      "We need a Sprinter Van for 12 people going to a Broadway performance.",
      "Please pick us up at JFK and take us to our hotel.",
      "Our group is attending an AI conference in Manhattan.",
      "We need transportation for a corporate event and dinner.",
      "Can you improve the pickup time to 7:30 PM?",
    ];

    for (const message of acceptedExamples) {
      assert.equal(
        containsSpam(message),
        false,
        `Expected legitimate message to be accepted: "${message}"`,
      );
    }
  });

  it("never blocks generic single words on their own", () => {
    const genericWords = [
      "performance",
      "performing",
      "missing",
      "search",
      "searches",
      "improve",
      "better",
      "upgrade",
      "position",
      "geo",
      "artificial",
      "intelligent",
      "AI",
      "website",
      "Google",
    ];

    for (const word of genericWords) {
      assert.equal(
        containsSpam(word),
        false,
        `Expected standalone generic word not to be blocked: "${word}"`,
      );
    }
  });

  it("handles non-string and empty inputs safely", () => {
    assert.equal(containsSpam(""), false);
    assert.equal(containsSpam("   "), false);
    assert.equal(containsSpam(null), false);
    assert.equal(containsSpam(undefined), false);
    assert.equal(containsSpam(123), false);
  });
});
