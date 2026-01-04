import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import { access } from "node:fs/promises";
import database from "@/infra/database.js";

async function runMigrations(dryRun) {
  const dbClient = await database.getNewClient();

  try {
    // Use process.cwd() para garantir o caminho correto em produção
    const migrationsDir = join(process.cwd(), "infra", "migrations");

    // Verificar se o diretório existe
    try {
      await access(migrationsDir);
    } catch {
      throw new Error(
        `Can't get migration files: Migration directory not found at ${migrationsDir}`,
      );
    }

    const migrationsOptions = {
      dbClient,
      dryRun,
      dir: migrationsDir,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    console.log(migrationsDir);

    return await migrationRunner(migrationsOptions);
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  runMigrations,
};

export default migrator;
