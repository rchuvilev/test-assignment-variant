const path = require("path");
const { execSync } = require("child_process");

try {
  [
    "bun install",
    `pushd ./packages/wasm-ai-api &&
     curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash &&
     spin templates install --git https://github.com/spinframework/spin-js-sdk --update &&
     spin new
    `,
  ].forEach((command) => {
    execSync(command, { cmd: path.resolve(__dirname), stdio: "inherit" });
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
