import { version as uuidVersion } from "uuid";
import orchestrator from "../orchestrator";
import password from "models/password";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "Guilherme",
          email: "guilherme@gmail.com",
          password: "senha123",
        }),
      });
      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "Guilherme",
        email: "guilherme@gmail.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const correctPasswordMatch = await password.compare(
        "senha123",
        responseBody.password,
      );

      const incorrectPasswordMatch = await password.compare(
        "incorrectPassord",
        responseBody.password,
      );
      
      expect(correctPasswordMatch).toBe(true);
      expect(incorrectPasswordMatch).toBe(false);
    });
    test("With duplicated email", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "emailduplicado1",
          email: "duplicado@gmail.com",
          password: "senha123",
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "emailduplicado2",
          email: "Duplicado@gmail.com",
          password: "senha123",
        }),
      });
      expect(response2.status).toBe(409);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "O email informado já está sendo utilizado.",
        name: "ValidationError",
        action: "Utilize outro email para realizar o cadastro.",
        status_code: 409,
      });
    });
    test("With duplicated username", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "usernameduplicado",
          email: "email1@gmail.com",
          password: "senha123",
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "UsernameDuplicado",
          email: "email2@gmail.com",
          password: "senha123",
        }),
      });
      expect(response2.status).toBe(409);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "O username informado já está sendo utilizado.",
        name: "ValidationError",
        action: "Utilize outro username para realizar o cadastro.",
        status_code: 409,
      });
    });
  });
});
