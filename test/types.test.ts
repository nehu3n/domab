import { expectTypeOf, test } from "vitest";

import { error, event, flow, type Infer, id, port, repo, value } from "@/index";

const UserId = id("user");
const OrderId = id("order");

const Email = value("email", (input: string) => input.includes("@"));

type UserId = Infer<typeof UserId>;
type OrderId = Infer<typeof OrderId>;
type Email = Infer<typeof Email>;

test("ids are nominal by name", () => {
  expectTypeOf<UserId>().not.toEqualTypeOf<OrderId>();
});

test("values are nominal by name", () => {
  const Username = value("username");

  type Username = Infer<typeof Username>;

  expectTypeOf<Email>().not.toEqualTypeOf<Username>();
});

test("repositories preserve their contract", () => {
  interface Users {
    get: (id: UserId) => Promise<string | null>;
  }

  const users = repo<Users>();

  const implementation: Users = {
    get: async () => null,
  };

  expectTypeOf(users.implement).parameter(0).toEqualTypeOf<Users>();
  expectTypeOf(users.implement(implementation)).not.toBeAny();
});

test("ports preserve their contract", () => {
  interface Mail {
    send: (email: Email) => Promise<void>;
  }

  const mail = port<Mail>();

  expectTypeOf(mail.implement).parameter(0).toEqualTypeOf<Mail>();
});

test("flows preserve input, dependencies and output types", () => {
  const create = flow(
    (
      input: {
        email: Email;
      },
      dependencies: {
        users: {
          save: (email: Email) => Promise<UserId>;
        };
      }
    ) => dependencies.users.save(input.email)
  );

  expectTypeOf(create).parameter(0).toEqualTypeOf<{ email: Email }>();
  expectTypeOf(create).parameter(1).toEqualTypeOf<{
    users: {
      save: (email: Email) => Promise<UserId>;
    };
  }>();
  expectTypeOf(create).returns.toEqualTypeOf<Promise<UserId>>();
});

test("events preserve their payload", () => {
  const UserCreated = event<{
    id: UserId;
    email: Email;
  }>("user.created");

  type UserCreated = Infer<typeof UserCreated>;

  expectTypeOf(UserCreated).parameter(0).toEqualTypeOf<{
    id: UserId;
    email: Email;
  }>();

  expectTypeOf(UserCreated).returns.toEqualTypeOf<UserCreated>();
});

test("errors preserve their payload", () => {
  const UserExists = error<{
    email: Email;
  }>("user.exists");

  type UserExists = Infer<typeof UserExists>;

  expectTypeOf(UserExists).parameter(0).toEqualTypeOf<{
    email: Email;
  }>();

  expectTypeOf(UserExists).returns.toEqualTypeOf<UserExists>();
});

test("errors are constructible", () => {
  const UserNotFound = error<{
    userId: string;
  }>("user.not_found");

  expectTypeOf(UserNotFound).toMatchTypeOf<
    new (data: {
      userId: string;
    }) => Error
  >();
});
