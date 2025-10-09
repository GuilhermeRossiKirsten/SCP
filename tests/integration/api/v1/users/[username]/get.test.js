import { version as uuidVersion } from "uuid";
import orchestrator from "../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "MesmoCase",
          email: "mesmocase@gmail.com",
          password: "senha123",
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/MesmoCase",
      );
      expect(response2.status).toBe(200);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "MesmoCase",
        email: "mesmocase@gmail.com",
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });
    test("With case missmatch", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          username: "CaseDiferente",
          email: "casediferente@gmail.com",
          password: "senha123",
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/casediferente",
      );
      expect(response2.status).toBe(200);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "CaseDiferente",
        email: "casediferente@gmail.com",
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      expect(uuidVersion(response2Body.id)).toBe(4);
      expect(Date.parse(response2Body.created_at)).not.toBeNaN();
      expect(Date.parse(response2Body.updated_at)).not.toBeNaN();
    });
    test("With nonexistent username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
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
  });
});
