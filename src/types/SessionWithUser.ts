import type { Session } from "@ory/kratos-client-fetch";

export type SessionWithUser = Omit<Session, "identity"> & {
  identity?: {
    traits: {
      email: string;
      name: {
        first: string;
        last: string;
      };
    };
  };
};
