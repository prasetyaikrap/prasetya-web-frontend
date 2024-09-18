import * as bcrypts from "bcrypt-ts";

import AuthenticationError from "@/services/commons/exceptions/AuthenticationError";

export default class BcryptPasswordHash {
  public _bcrypt: typeof bcrypts;
  public _saltRound: number;

  constructor(bcrypt: typeof bcrypts, saltRound = 10) {
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password: string) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(password: string, hashedPassword: string) {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError("kredensial yang Anda masukkan salah");
    }
  }
}
