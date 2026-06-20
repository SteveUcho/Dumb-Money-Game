import type { Session } from "@ory/kratos-client-fetch";

export type SessionWithUser = Omit<Session, "identity"> & {
  identity?: {
    id: string;
    traits: {
      email: string;
      name: {
        first: string;
        last: string;
      };
    };
  };
};
