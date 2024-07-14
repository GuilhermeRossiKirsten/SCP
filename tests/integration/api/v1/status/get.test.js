test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  //expect(responseBody.updated_at).toBeDefined(); //verifica apenas se existe/se foi configurado :(
  //new Date(responseBody.updated_at).toISOString(); //apenas verifica se o valor é válido, mas ainda podemos passar null

  const parseUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdateAt);

  expect(responseBody.dependecies.database.version).toEqual("16.0");
  expect(responseBody.dependecies.database.max_connections).toEqual(100);
  expect(responseBody.dependecies.database.opened_connections).toEqual(1);
});

// test.skip("Teste de SQL injection", async () => {
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName=';");
//   // await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4);");
//   await fetch(
//     "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
//   );
// });
