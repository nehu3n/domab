import type { Definition } from "@/internal";

type DomainError<Code extends string, Data> = Error &
  Readonly<{
    code: Code;
    data: Data;
  }>;

type ErrorFactory<Code extends string, Data> = [Data] extends [undefined]
  ? {
      (): DomainError<Code, undefined>;
      new (): DomainError<Code, undefined>;
    }
  : {
      (data: Data): DomainError<Code, Data>;
      new (data: Data): DomainError<Code, Data>;
    };

type ErrorDefinition<Code extends string, Data> = Definition<
  DomainError<Code, Data>
> &
  Readonly<{
    code: Code;
  }> &
  ErrorFactory<Code, Data>;

export function error<const Code extends string>(
  code: Code
): ErrorDefinition<Code, undefined>;

export function error<Data, const Code extends string = string>(
  code: Code
): ErrorDefinition<Code, Data>;

export function error(code: string): ErrorDefinition<string, undefined> {
  const prototype = Object.create(Error.prototype);

  const create = function (this: unknown, data?: unknown) {
    const instance = new Error(code);

    Object.setPrototypeOf(instance, prototype);

    instance.name = "DomabError";

    Object.defineProperties(instance, {
      code: {
        configurable: false,
        enumerable: true,
        value: code,
        writable: false,
      },
      data: {
        configurable: false,
        enumerable: true,
        value: data,
        writable: false,
      },
    });

    return instance;
  };

  Object.defineProperty(create, "prototype", {
    value: prototype,
  });

  return Object.assign(create, {
    code,
  }) as ErrorDefinition<string, undefined>;
}
