import { ValidationError } from "@/infra/errors";
import user from "@/models/user";

export async function POST(request) {
  try {
    const userInput = await request.json();

    const newUser = await user.create(userInput);

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
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
