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

// Get environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const GEO_RADIUS = process.env.GEO_RADIUS || "100";

if (!JWT_SECRET) {
  console.error("JWT_SECRET is required but not set");
  process.exit(1);
}

// Create multipart form data for ES modules
const boundary = "----FormBoundary" + Date.now();
let body = `--${boundary}\r\n`;
body += 'Content-Disposition: form-data; name="metadata"\r\n';
body += "Content-Type: application/json\r\n\r\n";
body +=
  JSON.stringify({
    main_module: "worker.js",
    compatibility_date: "2026-04-12",
    compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
    modules: [
      {
        name: "worker.js",
        type: "modules",
      },
    ],
    d1_databases: [
      {
        binding: "GETINWORK_DB",
        database_name: "getinwork-db",
        database_id: "c9cda03d-53a0-4fdd-92ea-73ff097c53d8",
      },
    ],
    services: [
      {
        binding: "WORKER_SELF_REFERENCE",
        service: "getinwork",
      },
    ],
    env: {
      production: {
        vars: {
          JWT_SECRET: JWT_SECRET,
          GEO_RADIUS: GEO_RADIUS,
        },
      },
    },
  }) + "\r\n";
body += `--${boundary}\r\n`;
body +=
  'Content-Disposition: form-data; name="worker.js"; filename="worker.js"\r\n';
body += "Content-Type: application/javascript+module\r\n\r\n";
body += script + "\r\n";
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
