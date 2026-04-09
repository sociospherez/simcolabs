#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, "src");
const pagesDir = path.join(srcDir, "pages");
const transformationDir = path.join(srcDir, "components", "transformation");

const pageFile = path.join(pagesDir, "TransformationBrief.jsx");

// ⚠️ Using normal string instead of template literal
const pageContent =
  'import React from "react";\n\n' +
  'export default function TransformationBrief() {\n' +
  '  return (\n' +
  '    <div className="min-h-screen text-white p-10">\n' +
  '      <h1 className="text-4xl font-bold">Transformation Brief</h1>\n' +
  '      <p className="mt-4 text-slate-300">\n' +
  '        From Legacy Strength to Future Scale\n' +
  '      </p>\n' +
  '    </div>\n' +
  '  );\n' +
  '}\n';

function log(msg) {
  console.log("[SimCo Integrator] " + msg);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log("Created directory: " + dir);
  }
}

function writeFileIfMissing(file, content) {
  if (fs.existsSync(file)) {
    log("File already exists: " + file);
    return;
  }
  fs.writeFileSync(file, content, "utf8");
  log("Created file: " + file);
}

function main() {
  log("Starting...");

  ensureDir(pagesDir);
  ensureDir(transformationDir);

  writeFileIfMissing(pageFile, pageContent);

  log("Done. Now manually add route if needed:");
  log('<Route path="/transformation-brief" element={<TransformationBrief />} />');
}

main();