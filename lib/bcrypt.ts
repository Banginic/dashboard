import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(db_password: string, password: string) {
  return await bcrypt.compare(db_password, password);
}
