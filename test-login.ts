import { db } from "./src/db/index";
import { companies } from "./src/db/schema";
import argon2 from "argon2";

async function verify() {
  const allCompanies = await db.select().from(companies);
  console.log("Companies:", allCompanies);

  for (const c of allCompanies) {
    const match = await argon2.verify(c.password, "admin123");
    console.log(`Company: ${c.name}, Match: ${match}`);
  }
}

verify().catch(console.error);
