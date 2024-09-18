import InvariantError from "./InvariantError";

type DomainErrorTranslatorProps = {
  translate: (error: Error) => InvariantError;
  _directories: { [key: string]: InvariantError };
};

export enum DomainError {
  "LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY" = "LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY",
  "LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION" = "LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION",
  "USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY" = "USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY",
  "USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION" = "USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION",
}

const DomainErrorTranslator: DomainErrorTranslatorProps = {
  translate(error: Error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
  _directories: {
    [DomainError["LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY"]]: new InvariantError(
      "Cannot logged in due to invalid payload property (email and password)"
    ),
    [DomainError["LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError(
        "Cannot logged in due to invalid payload property data type"
      ),
    [DomainError["USER_AUTH.NOT_CONTAIN_NEEDED_PROPERTY"]]: new InvariantError(
      "Invalid payload (accessToken and refreshToken"
    ),
    [DomainError["USER_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION"]]:
      new InvariantError("Invalid payload data type"),
  },
};

export default DomainErrorTranslator;
