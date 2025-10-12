import password from "@/models/password";
import user from "@/models/user";
import { NotFoundError, UnauthorizedError } from "@/infra/errors";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  const storedUser = await findUserByEmail(providedEmail);
  await validatePassword(providedPassword, storedUser.password);

  return storedUser;

  async function findUserByEmail(providedEmail) {
    let storedUser;
    try {
      storedUser = await user.findByEmail(providedEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Dados de autenticação não conferem.",
          action: "Verifique se os dados enviados estão corretos.",
        });
      }
      throw error;
    }

    return storedUser;
  }

  async function validatePassword(providedPassword, storedPassword) {
    const correctPasswordMatch = await password.compare(
      providedPassword,
      storedPassword,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
