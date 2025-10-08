import migrator from "@/models/migrator";

export async function GET() {
  try {
    const pendingMigrations = await migrator.runMigrations(true);
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
    const appliedMigrations = await migrator.runMigrations(false);
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
