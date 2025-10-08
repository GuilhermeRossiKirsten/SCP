import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "@/infra/database.js";

async function runMigrations(dryRun) {
  const dbClient = await database.getNewClient();

  try {
    const migrationsOptions = {
      dbClient,
      dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    return await migrationRunner(migrationsOptions);
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  runMigrations
}

export default migrator;