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
    await dbClient.end();
  }
}

export async function GET() {
  try {
    const pendingMigrations = await runMigrations(true);
    return new Response(JSON.stringify(pendingMigrations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch migrations" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST() {
  try {
    const appliedMigrations = await runMigrations(false);
    const statusCode = appliedMigrations.length > 0 ? 201 : 200;

    return new Response(JSON.stringify(appliedMigrations), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to run migrations" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
