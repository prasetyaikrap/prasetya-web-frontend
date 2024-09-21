import {
  CLIENT_IDS,
  CLIENT_IDS_ENUM,
} from "@/services/commons/constants/general";
import { DomainError } from "@/services/commons/exceptions/DomainErrorTranslator";

export type ClientIdentityAuthProps = {
  clientId: string;
};

export default class ClientIdentityAuth {
  public clientId: string;

  constructor(payload: ClientIdentityAuthProps) {
    this._verifyPayload(payload);
    const { clientId } = payload;
    this.clientId = clientId || "";
  }

  _verifyPayload(payload: ClientIdentityAuthProps) {
    const { clientId } = payload;
    if (!clientId) {
      throw new Error(DomainError["CLIENT_IDENTITY.CLIENT_ID_REQUIRED"]);
    }

    if (!CLIENT_IDS.includes(clientId as CLIENT_IDS_ENUM)) {
      throw new Error(DomainError["CLIENT_IDENTITY.INVALID_CLIENT_ID"]);
    }
  }
}
