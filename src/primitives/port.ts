import type { Definition } from "@/internal";

interface PortDefinition<Value> extends Definition<Value> {
  implement: (implementation: Value) => Value;
}

export function port<Value>(): PortDefinition<Value> {
  const implement = (implementation: Value): Value => implementation;

  return Object.freeze({
    implement,
  }) as PortDefinition<Value>;
}
