/**
 * 用户系统 — 基于本地 JSON 文件，不依赖数据库
 */
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const USER_COOKIE = "user_token";
const DATA_FILE = path.join(process.cwd(), "content", "users.json");

interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

function readUsers(): StoredUser[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch { return []; }
}

function writeUsers(users: StoredUser[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function registerUser(username: string, email: string, password: string) {
  const users = readUsers();
  if (users.find((u) => u.username === username || u.email === email)) {
    return { error: "用户名或邮箱已被注册" };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = {
    id: `u_${Date.now()}`, username, email, passwordHash, role: "user",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return { user: { id: user.id, username, email, role: user.role } };
}

export async function loginUser(identifier: string, password: string) {
  const users = readUsers();
  const user = users.find((u) => u.username === identifier || u.email === identifier);
  if (!user) return { error: "用户不存在" };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "密码错误" };

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, `${user.id}`, {
    httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });

  return { user: { id: user.id, username: user.username, email: user.email, role: user.role } };
}

export async function setUserCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, userId, {
    httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(USER_COOKIE)?.value;
    if (!userId) return null;

    if (userId === "admin") return { id: "admin", username: "admin", email: "", role: "admin" };

    const users = readUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    return { id: user.id, username: user.username, email: user.email, role: user.role };
  } catch { return null; }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIE);
}

export async function trackPageView(userId: string, pagePath: string) {
  try {
    const dir = path.join(process.cwd(), "content");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const logFile = path.join(dir, "pageviews.log");
    fs.appendFileSync(logFile, JSON.stringify({ userId, path: pagePath, time: new Date().toISOString() }) + "\n");
  } catch { /* silent */ }
}
