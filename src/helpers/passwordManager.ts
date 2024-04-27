import { hash, compare } from "bcrypt";

export async function hasPassword(password: string) {
  const hash_ = await hash(password, 12);
  return hash_;
}

export async function verifyPassword(
  plainTextPass: string,
  hashedPassword: string
) {
  const res = await compare(plainTextPass, hashedPassword);
  return res;
}
