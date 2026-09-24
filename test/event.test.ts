import { describe, expect, it } from "vitest";

import { event } from "@/index";

describe("event", () => {
  it("creates an event with data", () => {
    const UserCreated = event<{
      id: string;
      email: string;
    }>("user.created");

    expect(
      UserCreated({
        email: "nehuen@example.com",
        id: "usr_1",
      })
    ).toEqual({
      data: {
        email: "nehuen@example.com",
        id: "usr_1",
      },
      type: "user.created",
    });
  });

  it("creates an event without data", () => {
    const UserDeleted = event("user.deleted");

    expect(UserDeleted()).toEqual({
      data: undefined,
      type: "user.deleted",
    });
  });
});
