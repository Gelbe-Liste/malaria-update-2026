import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";

const project = fs.readFileSync(new URL("../src/project.js", import.meta.url));
test("Editorial project source preserved byte-for-byte", () => {
  assert.equal(crypto.createHash("sha256").update(project).digest("hex"), "5f856c63fb777f5442af495b56e13133f90acd08557fd3820e15554b4e47b5d0");
});
test("Project identifier is stable and shared tracking modules are wired",()=> {
  const src=fs.readFileSync(new URL("../src/App.jsx",import.meta.url),"utf8");
  assert.match(src, /project\.meta\.projectId/);
  assert.match(src, /standalone_mode: getStandaloneMode\(\)/);
  assert.match(src, /<AnalyticsConsent \/>/);
  assert.match(src, /<PosthogDiagnostics \/>/);
});
