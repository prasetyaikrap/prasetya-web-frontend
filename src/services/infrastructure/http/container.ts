import authentications from "@/services/interfaces/http/api/authentications";
import AuthenticationRepository from "../repository/authentications/AuthenticationRepository";
import firebaseInitialize from "@/libs/firebase/initialize";
import AdminRepository from "../repository/admins/AdminRepository";
import AuthTokenManager from "../security/AuthTokenManager";
import * as Jose from "jose";
import * as bcrypts from "bcrypt-ts";
import PasswordHash from "../security/PasswordHash";
import LoginAdminUseCase from "@/services/applications/usecases/authentications/LoginAdminUseCase";

export default async function serviceContainer() {
  const { firestoreDB } = await firebaseInitialize();
  // Repository and Security
  const authenticationRepository = new AuthenticationRepository({
    firestore: firestoreDB,
  });
  const adminRepository = new AdminRepository({ firestore: firestoreDB });
  const authTokenManager = new AuthTokenManager(Jose);
  const passwordHash = new PasswordHash(bcrypts);

  // UseCases
  const loginAdminUseCase = new LoginAdminUseCase({
    adminRepository,
    authenticationRepository,
    authTokenManager,
    passwordHash,
  });

  // Routes
  const authenticationRoutes = await authentications.register({
    loginAdminUseCase,
  });

  return [...authenticationRoutes];
}
