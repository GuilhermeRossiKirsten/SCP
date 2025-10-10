import { version as uuidVersion } from "uuid";
import orchestrator from "../../orchestrator";
import password from "models/password";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
        {
          method: "PATCH",
          body: JSON.stringify({
            username: "Guilherme",
            email: "guilherme@gmail.com",
            password: "senha123",
          }),
        },
      );
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        action: "Utilize outro username para realizar a busca.",
        message: "O username não foi encontrado.",
        name: "NotFoundError",
        status_code: 404,
      });
    });

    test("With duplicated username", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "user1",
          email: "user1@gmail.com",
          password: "senha123",
        }),
      });
      expect(user1Response.status).toBe(201);

      const user2Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "user2",
          email: "user2@gmail.com",
          password: "senha123",
        }),
      });
      expect(user2Response.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/user2",
        {
          method: "PATCH",
          body: JSON.stringify({
            username: "user1",
          }),
        },
      );
      expect(response2.status).toBe(409);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "O username informado já está sendo utilizado.",
        name: "ValidationError",
        action: "Utilize outro username para realizar esta operação.",
        status_code: 409,
      });
    });

    test("With duplicated email", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "email1",
          email: "email1@gmail.com",
          password: "senha123",
        }),
      });
      expect(user1Response.status).toBe(201);

      const user2Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "email2",
          email: "email2@gmail.com",
          password: "senha123",
        }),
      });
      expect(user2Response.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/email2",
        {
          method: "PATCH",
          body: JSON.stringify({
            email: "email1@gmail.com",
          }),
        },
      );
      expect(response2.status).toBe(409);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "O email informado já está sendo utilizado.",
        name: "ValidationError",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 409,
      });
    });

    test("With unique username", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "uniqueUser1",
          email: "uniqueuser1@gmail.com",
          password: "senha123",
        }),
      });
      expect(user1Response.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueUser1",
        {
          method: "PATCH",
          body: JSON.stringify({
            username: "uniqueUser2",
          }),
        },
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueUser2",
        email: "uniqueuser1@gmail.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With unique email", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "uniqueemail1",
          email: "uniqueemail1@gmail.com",
          password: "senha123",
        }),
      });
      expect(user1Response.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/uniqueemail1",
        {
          method: "PATCH",
          body: JSON.stringify({
            email: "uniqueemail2@gmail.com",
          }),
        },
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "uniqueemail1",
        email: "uniqueemail2@gmail.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new password", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "changepassword",
          email: "changepassword@gmail.com",
          password: "changepassword",
        }),
      });
      expect(user1Response.status).toBe(201);

      const response = await fetch(
        "http://localhost:3000/api/v1/users/changepassword",
        {
          method: "PATCH",
          body: JSON.stringify({
            password: "senha123",
          }),
        },
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "changepassword",
        email: "changepassword@gmail.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findByUsername("changepassword");

      const correctPasswordMatch = await password.compare(
        "senha123",
        userInDatabase.password,
      );

      const incorrectPasswordMatch = await password.compare(
        "changepassword",
        userInDatabase.password,
      );

      expect(correctPasswordMatch).toBe(true);
      expect(incorrectPasswordMatch).toBe(false);
    });
  });
});
