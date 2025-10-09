import { NotFoundError } from "@/infra/errors";
import user from "@/models/user";

export async function GET(request, { params }) {
  try {
    const { username } = await params;

    const userFound = await user.findByUsername(username);

    return new Response(JSON.stringify(userFound), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to run migrations" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
