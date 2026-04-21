#!/usr/bin/env node
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const API_TOKEN = process.env.CF_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error("CF_ACCOUNT_ID and CF_API_TOKEN required");
  process.exit(1);
}

// Get environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const GEO_RADIUS = process.env.GEO_RADIUS || "100";

if (!JWT_SECRET) {
  console.error("JWT_SECRET is required but not set");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openNextDir = path.join(__dirname, "../.open-next");

// Collect all module files
const modules = [];
const moduleFiles = new Map();

function collectModules(dir, prefix = "") {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      collectModules(fullPath, prefix ? `${prefix}/${file}` : file);
    } else if (file.endsWith(".js") || file.endsWith(".mjs")) {
      const moduleName = prefix ? `${prefix}/${file}` : file;
      moduleFiles.set(moduleName, fullPath);
      modules.push({ name: moduleName, type: "modules" });
    }
  }
}

// Collect main worker
const workerPath = path.join(openNextDir, "worker.js");
moduleFiles.set("worker.js", workerPath);
modules.push({ name: "worker.js", type: "modules" });

// Collect all other modules from cloudflare and server-functions
collectModules(path.join(openNextDir, "cloudflare"));
collectModules(path.join(openNextDir, "server-functions"));
collectModules(path.join(openNextDir, "middleware"));

console.log(`Found ${modules.length} modules to deploy`);
modules.forEach((m) => console.log(`  - ${m.name}`));

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
    modules: modules,
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

// Add each module file to the body
for (const [moduleName, filePath] of moduleFiles.entries()) {
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="${moduleName}"; filename="${moduleName}"\r\n`;
  body += "Content-Type: application/javascript+module\r\n\r\n";
  body += fs.readFileSync(filePath, "utf-8") + "\r\n";
}

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
