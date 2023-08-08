import { hashSync } from "bcryptjs";

export default function codeGenerator(input: string): string {
  const hash = hashSync(input);
  return hash;
}