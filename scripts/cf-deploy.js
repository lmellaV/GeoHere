#!/usr/bin/env node
import fs from "fs";
import https from "https";

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const API_TOKEN = process.env.CF_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error("CF_ACCOUNT_ID and CF_API_TOKEN required");
  process.exit(1);
}

const script = fs.readFileSync(".open-next/worker.js", "utf-8");

const options = {
  hostname: "api.cloudflare.com",
  path: `/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/getinwork`,
  method: "PUT",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/javascript",
    "Content-Length": Buffer.byteLength(script),
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (c) => {
    data += c;
  });
  res.on("end", () => {
    const result = JSON.parse(data);
    console.log(JSON.stringify(result, null, 2));
    if (result.success) {
      console.log("\n✓ Deployment successful");
      process.exit(0);
    } else {
      console.error("\n✗ Deployment failed");
      process.exit(1);
    }
  });
});

req.on("error", (e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

req.write(script);
req.end();
