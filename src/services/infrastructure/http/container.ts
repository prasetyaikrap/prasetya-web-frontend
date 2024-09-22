import * as bcrypts from "bcrypt-ts";
import * as Jose from "jose";

import firebaseInitialize from "@/libs/firebase/initialize";
import GetAdminByIdUseCase from "@/services/applications/usecases/admins/GetAdminByIdUseCase";
import GetAdminsUseCase from "@/services/applications/usecases/admins/GetAdminsUseCase";
import RegisterAdminUseCase from "@/services/applications/usecases/admins/RegisterAdminUseCase";
import LoginAdminUseCase from "@/services/applications/usecases/authentications/LoginAdminUseCase";
import LogoutAdminUseCase from "@/services/applications/usecases/authentications/LogoutAdminUseCase";
import RefreshAdminUseCase from "@/services/applications/usecases/authentications/RefreshAdminUseCase";
import VerifyAdminUseCase from "@/services/applications/usecases/authentications/VerifyAdminUseCase";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";
import PasswordHash from "@/services/infrastructure/security/PasswordHash";
import admins from "@/services/interfaces/http/api/admins";
import authentications from "@/services/interfaces/http/api/authentications";

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
  const verifyAdminUseCase = new VerifyAdminUseCase({
    authTokenManager,
  });
  const refreshAdminUseCase = new RefreshAdminUseCase({
    authenticationRepository,
    authTokenManager,
  });
  const logoutAdminUseCase = new LogoutAdminUseCase({
    authenticationRepository,
    authTokenManager,
  });
  const registerAdminUseCase = new RegisterAdminUseCase({
    adminRepository,
    passwordHash,
  });
  const getAdminsUseCase = new GetAdminsUseCase({ adminRepository });
  const getAdminByIdUseCase = new GetAdminByIdUseCase({ adminRepository });

  // Routes
  const authenticationRoutes = await authentications.register({
    loginAdminUseCase,
    verifyAdminUseCase,
    refreshAdminUseCase,
    logoutAdminUseCase,
  });
  const adminRoutes = await admins.register({
    registerAdminUseCase,
    verifyAdminUseCase,
    getAdminsUseCase,
    getAdminByIdUseCase,
  });

  return [...authenticationRoutes, ...adminRoutes];
}
