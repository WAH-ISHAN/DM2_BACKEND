import { createHash } from "crypto";

export function sha256(pw: string) {
  return createHash("sha256").update(pw).digest("hex");
}
// Tip: For production, use bcrypt/argon2.