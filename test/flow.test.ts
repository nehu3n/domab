import { describe, expect, it } from "vitest";

import { flow } from "@/index";

describe("flow", () => {
  it("executes synchronously", () => {
    const add = flow(
      (input: number, dependencies: { amount: number }) =>
        input + dependencies.amount
    );

    expect(add(2, { amount: 3 })).toBe(5);
  });

  it("supports asynchronous operations", async () => {
    const getUser = flow(
      async (
        id: string,
        dependencies: {
          users: {
            get: (id: string) => Promise<string>;
          };
        }
      ) => dependencies.users.get(id)
    );

    const result = await getUser("usr_1", {
      users: {
        // biome-ignore lint/suspicious/useAwait: test code
        async get(id) {
          return id;
        },
      },
    });

    expect(result).toBe("usr_1");
  });
});
