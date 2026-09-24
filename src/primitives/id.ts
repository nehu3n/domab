/** biome-ignore-all lint/suspicious/noExplicitAny: false positive */
import type { Brand, Definition } from "@/internal";

type Identifier<Name extends string, Value> = Brand<Value, "id", Name>;

interface IdDefinition<Name extends string, Value>
  extends Definition<Identifier<Name, Value>> {
  (value: Value): Identifier<Name, Value>;
}

export function id<const Name extends string>(
  name: Name
): IdDefinition<Name, string>;

export function id<Value, const Name extends string = string>(
  name: Name
): IdDefinition<Name, Value>;

export function id(name: string): IdDefinition<string, any> {
  // biome-ignore lint/complexity/noVoid: ...
  void name;

  return ((value: unknown) => value) as IdDefinition<string, any>;
}
