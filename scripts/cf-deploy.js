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

// Create multipart form data for script + metadata
const boundary = "----FormBoundary" + Date.now();
let body = `--${boundary}\r\n`;
body += 'Content-Disposition: form-data; name="script"; filename="worker.js"\r\n';
body += 'Content-Type: application/javascript\r\n\r\n';
body += script + '\r\n';
body += `--${boundary}\r\n`;
body += 'Content-Disposition: form-data; name="metadata"\r\n';
body += 'Content-Type: application/json\r\n\r\n';
body += JSON.stringify({
  main_module: "worker.js",
  compatibility_date: "2026-04-12",
  compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]
}) + '\r\n';
body += `--${boundary}--\r\n`;

const options = {
  hostname: "api.cloudflare.com",
  path: `/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/getinwork`,
  method: "PUT",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
    "Content-Length": Buffer.byteLength(body),
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

req.write(body);
req.end();
