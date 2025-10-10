import database from "@/infra/database";
import { NotFoundError, ValidationError } from "@/infra/errors";
import passwordModel from "@/models/password";

async function findByUsername(username) {
  const userFound = await runSelectQuery(username);
  return userFound;

  async function runSelectQuery(username) {
    const results = await database.query({
      text: `
      SELECT
        id, username, password, email, created_at, updated_at
      FROM
        users
      WHERE
        LOWER(username) = LOWER($1)
      LIMIT
        1
      `,
      values: [username],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O username não foi encontrado.",
        action: "Utilize outro username para realizar a busca.",
      });
    }

    return results.rows[0];
  }
}

async function create(userInput) {
  await validateUniqueUsername(userInput.username);
  await validateUniqueEmail(userInput.email);
  await hashPasswordInObject(userInput);

  const newUser = await runInsertQuery(userInput);
  return newUser;

  async function runInsertQuery(userInput) {
    const result = await database.query({
      text: `
      INSERT INTO
        users (username, email, password)
      VALUES
        ($1, $2, $3)
      RETURNING
        *`,

      values: [userInput.username, userInput.email, userInput.password],
    });

    return result.rows[0];
  }
}

async function update(requestUsername, requestBody) {
  const currentUser = await findByUsername(requestUsername);
  const { username, email, password } = requestBody;

  if ("username" in requestBody) {
    await validateUniqueUsername(username);
  }
  if ("email" in requestBody) {
    await validateUniqueEmail(email);
  }

  const userWithNewValues = {
    ...currentUser,
    ...(username && { username }),
    ...(email && { email }),
    ...(password && { password: await passwordModel.hash(password) }),
  };

  const updateUser = await runUpdateQuery(userWithNewValues);

  return updateUser;

  async function runUpdateQuery(userWithNewValues) {
    const results = await database.query({
      text: `
      UPDATE
        users
      SET
        username = $2,
        email = $3,
        password = $4,
        updated_at = timezone('utc', now())
      WHERE
        id = $1
      RETURNING
        *
      `,
      values: [
        userWithNewValues.id,
        userWithNewValues.username,
        userWithNewValues.email,
        userWithNewValues.password,
      ],
    });

    return results.rows[0];
  }
}

async function validateUniqueUsername(username) {
  const result = await database.query({
    text: `
    SELECT
      username
    FROM
      users
    WHERE
      LOWER(username) = LOWER($1)`,
    values: [username],
  });

  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "O username informado já está sendo utilizado.",
      action: "Utilize outro username para realizar esta operação.",
    });
  }
}

async function validateUniqueEmail(email) {
  const result = await database.query({
    text: `
    SELECT
      email
    FROM
      users
    WHERE
      LOWER(email) = LOWER($1)`,
    values: [email],
  });

  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "O email informado já está sendo utilizado.",
      action: "Utilize outro email para realizar esta operação.",
    });
  }
}

async function hashPasswordInObject(userObject) {
  userObject.password = await passwordModel.hash(userObject.password);
}

const user = {
  create,
  findByUsername,
  update,
};

export default user;
