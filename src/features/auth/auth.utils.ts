// Generate a random code_verifier (43–128 chars in base64url)
export function generateCodeVerifier(length = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  // Convert bytes to base64url manually to avoid btoa() issues
  const base64 = bytesToBase64(array);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

// Helper: Convert byte array to base64
function bytesToBase64(bytes: Uint8Array): string {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");
  return btoa(binString);
}

// Generate code_challenge from code_verifier
export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);

  const hashArray = new Uint8Array(hash);
  const base64 = bytesToBase64(hashArray);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
