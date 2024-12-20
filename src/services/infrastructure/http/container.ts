import * as bcrypts from "bcrypt-ts";
import * as Jose from "jose";

import firebaseInitialize from "@/libs/firebase/initialize";
import GetAdminByIdUseCase from "@/services/applications/usecases/admins/GetAdminByIdUseCase";
import GetAdminsUseCase from "@/services/applications/usecases/admins/GetAdminsUseCase";
import RegisterAdminUseCase from "@/services/applications/usecases/admins/RegisterAdminUseCase";
import UpdateAdminByIdUseCase from "@/services/applications/usecases/admins/UpdateAdminByIdUseCase";
import CreateArticleUseCase from "@/services/applications/usecases/articles/CreateArticleUseCase";
import GetArticleByIdOrSlugUseCase from "@/services/applications/usecases/articles/GetArticleByIdOrSlugUseCase";
import GetArticlesUseCase from "@/services/applications/usecases/articles/GetArticlesUseCase";
import UpdateArticleByIdUseCase from "@/services/applications/usecases/articles/UpdateArticleByIdUseCase";
import LoginAdminUseCase from "@/services/applications/usecases/authentications/LoginAdminUseCase";
import LogoutAdminUseCase from "@/services/applications/usecases/authentications/LogoutAdminUseCase";
import RefreshAdminUseCase from "@/services/applications/usecases/authentications/RefreshAdminUseCase";
import VerifyAdminUseCase from "@/services/applications/usecases/authentications/VerifyAdminUseCase";
import AdminRepository from "@/services/infrastructure/repository/admins/AdminRepository";
import AuthenticationRepository from "@/services/infrastructure/repository/authentications/AuthenticationRepository";
import AuthTokenManager from "@/services/infrastructure/security/AuthTokenManager";
import PasswordHash from "@/services/infrastructure/security/PasswordHash";
import adminsClient from "@/services/interfaces/http/api/admins";
import articlesClient from "@/services/interfaces/http/api/articles";
import authenticationsClient from "@/services/interfaces/http/api/authentications";

import ArticlesRepository from "../repository/articles/ArticlesRepository";
import MiddlewareHandlers from "./middleware";

export default async function serviceContainer() {
  const { firestoreDB } = await firebaseInitialize();
  // Repository and Security
  const authenticationRepository = new AuthenticationRepository({
    firestore: firestoreDB,
  });
  const adminRepository = new AdminRepository({ firestore: firestoreDB });
  const articlesRepository = new ArticlesRepository({ firestore: firestoreDB });
  const authTokenManager = new AuthTokenManager(Jose);
  const passwordHash = new PasswordHash(bcrypts);
  const middleware = new MiddlewareHandlers({ authTokenManager });

  // UseCases
  const useCases = {
    // Authentications
    loginAdminUseCase: new LoginAdminUseCase({
      adminRepository,
      authenticationRepository,
      authTokenManager,
      passwordHash,
    }),
    verifyAdminUseCase: new VerifyAdminUseCase({
      authTokenManager,
    }),
    refreshAdminUseCase: new RefreshAdminUseCase({
      authenticationRepository,
      authTokenManager,
    }),
    logoutAdminUseCase: new LogoutAdminUseCase({
      authenticationRepository,
      authTokenManager,
    }),

    // Admins
    registerAdminUseCase: new RegisterAdminUseCase({
      adminRepository,
      passwordHash,
      authTokenManager,
    }),
    getAdminsUseCase: new GetAdminsUseCase({
      adminRepository,
      authTokenManager,
    }),
    getAdminByIdUseCase: new GetAdminByIdUseCase({
      adminRepository,
      authTokenManager,
    }),
    updateAdminByIdUseCase: new UpdateAdminByIdUseCase({
      adminRepository,
      authTokenManager,
    }),

    // Articles
    createArticleUseCase: new CreateArticleUseCase({
      articlesRepository,
      adminRepository,
    }),
    updateArticleByIdUseCase: new UpdateArticleByIdUseCase({
      articlesRepository,
      adminRepository,
    }),
    getArticlesUseCase: new GetArticlesUseCase({
      articlesRepository,
    }),
    getArticleByIdOrSlugUseCase: new GetArticleByIdOrSlugUseCase({
      articlesRepository,
    }),
  };

  // Routes
  const authenticationRoutes = await authenticationsClient.register({
    loginAdminUseCase: useCases.loginAdminUseCase,
    verifyAdminUseCase: useCases.verifyAdminUseCase,
    refreshAdminUseCase: useCases.refreshAdminUseCase,
    logoutAdminUseCase: useCases.logoutAdminUseCase,
  });
  const adminRoutes = await adminsClient.register({
    registerAdminUseCase: useCases.registerAdminUseCase,
    getAdminsUseCase: useCases.getAdminsUseCase,
    getAdminByIdUseCase: useCases.getAdminByIdUseCase,
    updateAdminByIdUseCase: useCases.updateAdminByIdUseCase,
  });
  const articlesRoutes = await articlesClient.register({
    createArticleUseCase: useCases.createArticleUseCase,
    updateArticleByIdUseCase: useCases.updateArticleByIdUseCase,
    getArticlesUseCase: useCases.getArticlesUseCase,
    getArticleByIdOrSlugUseCase: useCases.getArticleByIdOrSlugUseCase,
  });

  return {
    routes: [...authenticationRoutes, ...adminRoutes, ...articlesRoutes],
    middleware,
  };
}
