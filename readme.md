<p align="center">
  <img src="https://github.com/nehu3n/domab/blob/main/.github/assets/domab-banner.webp" alt="Domab" width="750" />
</p>

<p align="center">
  <a href="https://github.com/nehu3n/domab"><b>GitHub</b></a>
  ·
  <a href="https://www.npmjs.com/package/domab"><b>npm</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/domab?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/github/license/nehu3n/domab?style=flat-square" alt="License" />
</p>

# Domab

**Domab** is a tiny, dependency-free library for building type-safe application domains in TypeScript.

It gives you a small set of primitives to define domain concepts, dependencies, operations, events, and errors — while keeping your domain independent from databases, frameworks, and infrastructure.

**Zero dependencies · ~4 KB**

## Installation

```bash
pnpm add domab
```

## Building a domain

A domain usually needs to describe a few different things:

* values and identifiers
* data access
* external dependencies
* operations
* events and errors

Domab provides a primitive for each.

### Identifiers

Use `id` when a value represents the identity of something.

```ts
import { id, type Infer } from "domab"

const UserId = id("user")
const OrderId = id("order")

type UserId = Infer<typeof UserId>
type OrderId = Infer<typeof OrderId>
```

`UserId` and `OrderId` are different types even though both are strings.

```ts
declare const userId: UserId
declare const orderId: OrderId

const id: UserId = userId

// Type error
const invalid: UserId = orderId
```

### Values

Use `value` when a primitive has its own meaning or rules.

```ts
import { value } from "domab"

const Email = value(
  "email",
  (value: string) => value.includes("@"),
)

const email = Email("hello@example.com")
```

Values can represent anything meaningful in your domain:

```ts
const Slug = value("slug")
const Phone = value("phone")
const Money = value("money")
```

### Repositories

A `repo` describes how your domain accesses persistent data.

```ts
import { repo } from "domab"

type User = {
  id: UserId
  email: Email
  name: string
}

type UserRepo = {
  get(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  save(user: User): Promise<void>
}

const users = repo<UserRepo>()
```

The domain only knows the contract. Your infrastructure decides whether that means D1, PostgreSQL, SQLite, an API, or an in-memory store.

```ts
const usersD1 = users.implement({
  async get(id) {
    // ...
  },

  async findByEmail(email) {
    // ...
  },

  async save(user) {
    // ...
  },
})
```

### Ports

Use `port` for dependencies that are not persistence.

```ts
type Mail = {
  send(to: Email, message: string): Promise<void>
}

const mail = port<Mail>()
```

It can later be implemented with Resend, SMTP, SES, or anything else.

```ts
const mailResend = mail.implement({
  async send(to, message) {
    // ...
  },
})
```

A simple rule is:

> `repo` is for data. `port` is for capabilities.

### Flows

A `flow` represents something your application does.

```ts
import { flow } from "domab"

const createUser = flow(
  async (
    input: {
      email: Email
      name: string
    },
    deps: {
      users: UserRepo
    },
  ) => {
    const existing = await deps.users.findByEmail(input.email)

    if (existing) {
      throw UserExists({ email: input.email })
    }

    const user: User = {
      id: UserId(generateId()),
      email: input.email,
      name: input.name,
    }

    await deps.users.save(user)

    return user
  },
)
```

Dependencies are explicit:

```ts
await createUser(input, {
  users: usersD1,
})
```

There is no container or hidden dependency resolution.

### Events

Use `event` for something that happened.

```ts
const UserCreated = event<{
  id: UserId
  email: Email
}>("user.created")

const created = UserCreated({
  id: user.id,
  email: user.email,
})
```

An event is just data:

```ts
{
  type: "user.created",
  data: {
    id,
    email,
  },
}
```

How it gets published is up to your application.

### Errors

Use `error` for expected domain failures.

```ts
const UserExists = error<{
  email: Email
}>("user.exists")
```

Then:

```ts
throw UserExists({
  email,
})
```

The result is a normal `Error` with a typed `code` and `data`.

## The idea

With these primitives, a domain can stay simple:

```text
id      → identity
value   → meaningful values
repo    → persistence
port    → external capabilities
flow    → operations
event   → things that happened
error   → domain failures
```

## License

[MIT](https://github.com/nehu3n/domab/blob/main/license)
