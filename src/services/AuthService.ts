import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";

export class AuthService {
static async register(email: string, password: string) {
const exists = await UserModel.findByEmail(email);
if (exists) return null;
const hash = await bcrypt.hash(password, 10);
const id = await UserModel.create(email.toLowerCase(), hash);
return { id, email: email.toLowerCase() };
}

static async login(email: string, password: string) {
const row = await UserModel.findByEmail(email.toLowerCase());
if (!row) return null;
const ok = await bcrypt.compare(password, (row as any).PASSWORD_HASH);
if (!ok) return null;
return { id: (row as any).ID, email: (row as any).EMAIL };
}

static async me(id: number) {
const row = await UserModel.findPublicById(id);
return row ? { id: (row as any).ID, email: (row as any).EMAIL } : null;
}
}