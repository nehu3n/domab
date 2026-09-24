import { describe, expect, it } from "vitest";

import { repo } from "@/index";

interface User {
  id: string;
  name: string;
}

interface Users {
  get: (id: string) => Promise<User | null>;
  save: (user: User) => Promise<void>;
}

describe("repo", () => {
  it("accepts and returns an implementation", () => {
    const users = repo<Users>();

    const implementation: Users = {
      // biome-ignore lint/suspicious/useAwait: test code
      async get() {
        return null;
      },

      // biome-ignore lint/suspicious/noEmptyBlockStatements: test code
      async save() {},
    };

    expect(users.implement(implementation)).toBe(implementation);
  });
});
