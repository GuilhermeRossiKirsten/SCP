const { spawn } = require("child_process");

function exitHandler() {
  console.log("Shutting down services...");
  spawn("npm", ["run", "services:stop"], {
    stdio: "inherit", // exibe stdout/stderr diretamente no terminal
  });
  process.exit();
}

process.on("SIGINT", () => {
  exitHandler();
});

process.on("SIGTERM", () => {
  exitHandler();
});

setInterval(() => {}, 1); // loop vazio só pra manter o processo vivo
