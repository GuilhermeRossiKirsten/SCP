import session from "@/models/session";
import * as cookie from "cookie";
import { InternalServerError, UnauthorizedError } from "@/infra/errors";

import authentication from "@/models/authentication";

export async function POST(request) {
  try {
    const userInput = await request.json();

    const authenticatedUser = await authentication.getAuthenticatedUser(
      userInput.email,
      userInput.password,
    );

    const newSession = await session.create(authenticatedUser.id);

    const setCookie = cookie.serialize("session_id", newSession.token, {
      path: "/",
      maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
    });

    return new Response(JSON.stringify(newSession), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setCookie,
      },
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
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
