export async function verifyRecaptcha(
  token: string,
  secret: string,
): Promise<{ success: boolean; invalidSecret: boolean }> {
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) {
    throw new Error(`Google reCAPTCHA verification returned ${response.status}.`);
  }
  const result: unknown = await response.json();
  if (result === null || typeof result !== "object" || !("success" in result)) {
    throw new Error("Google reCAPTCHA returned an invalid verification response.");
  }
  const errorCodes = "error-codes" in result && Array.isArray(result["error-codes"])
    ? result["error-codes"]
    : [];
  return {
    success: result.success === true,
    invalidSecret: errorCodes.some((code) => code === "invalid-input-secret" || code === "missing-input-secret"),
  };
}
