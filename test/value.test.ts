import { describe, expect, it } from "vitest";

import { value } from "@/index";

describe("value", () => {
  it("returns the provided value", () => {
    const Email = value("email", (input: string) => input.includes("@"));

    expect(Email("nehuen@example.com")).toBe("nehuen@example.com");
  });

  it("rejects invalid values", () => {
    const Email = value("email", (input: string) => input.includes("@"));

    expect(() => Email("invalid")).toThrow('Invalid value for "email".');
  });

  it("works without validation", () => {
    const Username = value("username");

    expect(Username("nehuen")).toBe("nehuen");
  });
});
