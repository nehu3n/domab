import { describe, expect, it } from "vitest";

import { error } from "@/index";

describe("error", () => {
  it("creates an Error with code and data", () => {
    const UserExists = error<{
      email: string;
    }>("user.exists");

    const instance = UserExists({
      email: "nehuen@example.com",
    });

    expect(instance).toBeInstanceOf(Error);
    expect(instance.name).toBe("DomabError");
    expect(instance.message).toBe("user.exists");
    expect(instance.code).toBe("user.exists");
    expect(instance.data).toEqual({
      email: "nehuen@example.com",
    });
  });

  it("supports errors without data", () => {
    const UserNotFound = error("user.not_found");

    const instance = UserNotFound();

    expect(instance).toBeInstanceOf(Error);
    expect(instance.code).toBe("user.not_found");
    expect(instance.data).toBeUndefined();
  });
});

it("is callable and constructible", () => {
  const UserExists = error<{
    email: string;
  }>("user.exists");

  const called = UserExists({
    email: "nehuen@example.com",
  });

  const constructed = new UserExists({
    email: "nehuen@example.com",
  });

  expect(called).toBeInstanceOf(Error);
  expect(constructed).toBeInstanceOf(Error);

  expect(called.code).toBe("user.exists");
  expect(constructed.code).toBe("user.exists");

  expect(called.data).toEqual({
    email: "nehuen@example.com",
  });

  expect(constructed.data).toEqual({
    email: "nehuen@example.com",
  });
});

it("supports instanceof with the definition", () => {
  const UserNotFound = error<{
    userId: string;
  }>("user.not_found");

  const instance = UserNotFound({
    userId: "usr_1",
  });

  expect(instance).toBeInstanceOf(UserNotFound);
});
