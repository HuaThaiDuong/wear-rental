import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";

function runOnce(command, args, options) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { ...options, stdio: "inherit", windowsHide: true });
    child.once("error", rejectRun);
    child.once("exit", (code) => code === 0 ? resolveRun() : rejectRun(new Error(`${command} exited with code ${code}`)));
  });
}

try {
  console.log("Starting PostgreSQL with Docker Compose...");
  await runOnce("docker", ["compose", "up", "-d"], { cwd: root });
} catch (error) {
  console.error(`Could not start the database: ${error.message}`);
  process.exit(1);
}

const children = [];
let stopping = false;

function stopTree(child) {
  if (!child?.pid) return;
  if (isWindows) {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  } else {
    child.kill("SIGINT");
  }
}

function stopAll(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) stopTree(child);
  setTimeout(() => process.exit(code), 300);
}

const frontendCommand = isWindows ? "npm.cmd" : "npm";
const backendCommand = isWindows ? "mvnw.cmd" : "./mvnw";
const frontend = spawn(frontendCommand, ["run", "dev"], {
  cwd: resolve(root, "frontend"), stdio: "inherit", shell: isWindows, windowsHide: true,
});
const backend = spawn(backendCommand, ["spring-boot:run"], {
  cwd: resolve(root, "backend"), stdio: "inherit", shell: isWindows, windowsHide: true,
});
children.push(frontend, backend);

for (const child of children) {
  child.once("error", (error) => {
    console.error(error.message);
    stopAll(1);
  });
  child.once("exit", (code) => {
    if (!stopping) stopAll(code ?? 1);
  });
}

process.once("SIGINT", () => stopAll(0));
process.once("SIGTERM", () => stopAll(0));
