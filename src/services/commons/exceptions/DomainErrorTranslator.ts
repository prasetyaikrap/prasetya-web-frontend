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
  "USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY" = "USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY",
  "USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION" = "USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION",
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
    [DomainError["USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY"]]: new InvariantError(
      "Invalid payload (accessToken and refreshToken"
    ),
    [DomainError["USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError("Invalid payload data type"),
  },
};

export default DomainErrorTranslator;
