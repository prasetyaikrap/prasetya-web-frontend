import InvariantError from "./InvariantError";

type DomainErrorTranslatorProps = {
  translate: (error: Error) => InvariantError;
  _directories: { [key: string]: InvariantError };
};

export enum DomainError {
  "LOGIN_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY" = "LOGIN_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY",
  "LOGIN_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION" = "LOGIN_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION",
  "LOGOUT_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY" = "LOGOUT_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY",
  "LOGOUT_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION" = "LOGOUT_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION",
  "VERIFY_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY" = "VERIFY_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY",
  "VERIFY_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION" = "VERIFY_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION",
  "ADMIN_AUTH.NOT_CONTAIN_NEEDED_PROPERTY" = "ADMIN_AUTH.NOT_CONTAIN_NEEDED_PROPERTY",
  "ADMIN_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION" = "ADMIN_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION",
  "CLIENT_IDENTITY.CLIENT_ID_REQUIRED" = "CLIENT_IDENTITY.CLIENT_ID_REQUIRED",
  "CLIENT_IDENTITY.INVALID_CLIENT_ID" = "CLIENT_IDENTITY.INVALID_CLIENT_ID",
}

const DomainErrorTranslator: DomainErrorTranslatorProps = {
  translate(error: Error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
  _directories: {
    [DomainError["LOGIN_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]]:
      new InvariantError(
        "Cannot logged in due to invalid payload property (email and password)"
      ),
    [DomainError["LOGIN_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError(
        "Cannot logged in due to invalid payload property data type"
      ),
    [DomainError["LOGOUT_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]]:
      new InvariantError("Cannot logged out due to invalid payload property"),
    [DomainError["LOGOUT_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError(
        "Cannot logged out due to invalid payload property data type"
      ),
    [DomainError["VERIFY_ADMIN.NOT_CONTAIN_NEEDED_PROPERTY"]]:
      new InvariantError("Cannot verify admin due to invalid payload property"),
    [DomainError["VERIFY_ADMIN.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError(
        "Cannot verify admin due to invalid payload property data type"
      ),
    [DomainError["ADMIN_AUTH.NOT_CONTAIN_NEEDED_PROPERTY"]]: new InvariantError(
      "Invalid payload (accessToken and refreshToken"
    ),
    [DomainError["ADMIN_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError("Invalid payload data type"),
    [DomainError["CLIENT_IDENTITY.CLIENT_ID_REQUIRED"]]: new InvariantError(
      "Client ID Header is required"
    ),
    [DomainError["CLIENT_IDENTITY.INVALID_CLIENT_ID"]]: new InvariantError(
      "You cannot access this resource. Invalid Client ID"
    ),
  },
};

export default DomainErrorTranslator;
