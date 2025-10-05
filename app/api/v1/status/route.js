import database from "@/infra/database";
import { InternalServerError } from "@/infra/errors";

export async function GET() {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionResult = await database.query(
      "SHOW max_connections;",
    );
    const databaseMaxConnectionValue = parseInt(
      databaseMaxConnectionResult.rows[0].max_connections,
    );

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const databaseOpenedConnectionsValue =
      databaseOpenedConnectionsResult.rows[0].count;

    const body = {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: databaseMaxConnectionValue,
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    const publicErrorObject = new InternalServerError({ cause: error });
    return new Response(JSON.stringify(publicErrorObject), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
