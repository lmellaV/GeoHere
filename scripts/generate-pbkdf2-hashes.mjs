#!/usr/bin/env node
import crypto from "crypto";

const ALGO = "PBKDF2";
const HASH_FN = "SHA-256";
const ITERATIONS = 250_000;
const KEY_LENGTH = 32;

function uint8ToHex(buf) {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    HASH_FN,
  );
  return `pbkdf2:${uint8ToHex(salt)}:${uint8ToHex(derived)}`;
}

(async () => {
  const admin = await hashPassword("Admin123#");
  const user = await hashPassword("User123#");

  console.log("Admin123# hash:");
  console.log(admin);
  console.log("\nUser123# hash:");
  console.log(user);
})();
