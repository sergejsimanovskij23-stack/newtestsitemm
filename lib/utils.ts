import fs from "fs";
import path from "path";
import crypto from "crypto";

const ADMIN_PASSWORD = "admin2024";
const DATA_PATH = path.join(process.cwd(), "data", "store.json");

export function readData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeData(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function verifyAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}
