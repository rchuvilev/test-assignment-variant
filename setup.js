const path = require("path");
const { execSync } = require("child_process");

try {
  [
    "bun install",
    "bun add -g turborepo",
    `
     pushd ./apps/spin-api &&
     curl -fsSL https://developer.fermyon.com/downloads/install.sh | bash &&
     spin templates install --git https://github.com/spinframework/spin-js-sdk --update
     # && spin new && cd openai-request && npm install
    `,
  ].forEach((command) => {
    execSync(command, { cmd: path.resolve(__dirname), stdio: "inherit" });
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}
