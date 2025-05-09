import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retreiving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      //expect(responseBody.updated_at).toBeDefined(); //verifica apenas se existe/se foi configurado :(
      //new Date(responseBody.updated_at).toISOString(); //apenas verifica se o valor é válido, mas ainda podemos passar null

      const parseUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parseUpdateAt);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});

// eslint-disable-next-line jest/no-commented-out-tests
// test.skip("Teste de SQL injection", async () => {
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=';");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4);");
//   await fetch(
//     "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
//   );
// });
