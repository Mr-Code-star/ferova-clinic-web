/**
 * Decodes a JWT payload WITHOUT verifying the signature.
 * Only use it to read public claims like id, email, role, etc.
 */
export function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
}

/**
 * Safely extracts a string from a claim that could be a string OR an array.
 *
 * @example
 * extractStringClaim("Nurse")                // "Nurse"
 * extractStringClaim(["Nurse", "Nurse"])     // "Nurse"
 * extractStringClaim(null)                   // null
 */
export function extractStringClaim(claim: any): string | null {
  if (typeof claim === 'string') return claim;
  if (Array.isArray(claim) && claim.length > 0) {
    return typeof claim[0] === 'string' ? claim[0] : null;
  }
  return null;
}
