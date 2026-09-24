import { describe, expect, it } from "vitest";

import { port } from "@/index";

interface Mail {
  send: (to: string, message: string) => Promise<void>;
}

describe("port", () => {
  it("accepts and returns an implementation", () => {
    const mail = port<Mail>();

    const implementation: Mail = {
      // biome-ignore lint/suspicious/noEmptyBlockStatements: test code
      async send() {},
    };

    expect(mail.implement(implementation)).toBe(implementation);
  });
});
