import retry from "async-retry";

import database from "infra/database";
import migrator from "models/migrator";
import user from "models/user";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    // realiza 10 tentativas por padrão
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runMigrations(false);
}

async function createUser(userObject) {
  const fakerData = await (
    await fetch("http://localhost:3000/api/faker")
  ).json();

  return await user.create({
    username:
      userObject?.username ||
      fakerData[0].internet.username.replace(/[_.-]/g, ""),
    email: userObject?.email || fakerData[0].internet.email,
    password: userObject?.password || fakerData[0].internet.password,
  });
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
};

export default orchestrator;
