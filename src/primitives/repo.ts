import type { Definition } from "@/internal";

interface RepoDefinition<Value> extends Definition<Value> {
  implement: (implementation: Value) => Value;
}

export function repo<Value>(): RepoDefinition<Value> {
  const implement = (implementation: Value): Value => implementation;

  return Object.freeze({
    implement,
  }) as RepoDefinition<Value>;
}
