import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "@/infra/errors";
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
    const publicErrorObject = new InternalServerError({ cause: error });
    return new Response(JSON.stringify(publicErrorObject), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { username } = await params;
    const requestBody = await request.json();

    const updatedUser = await user.update(username, requestBody);

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error(error);
    const publicErrorObject = new InternalServerError({ cause: error });
    return new Response(JSON.stringify(publicErrorObject), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
