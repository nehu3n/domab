/** biome-ignore-all lint/suspicious/noExplicitAny: false positive */
import type { Brand, Definition } from "@/internal";

type DomainValue<Name extends string, Value> = Brand<Value, "value", Name>;

interface ValueDefinition<Name extends string, Value>
  extends Definition<DomainValue<Name, Value>> {
  (value: Value): DomainValue<Name, Value>;
}

export function value<const Name extends string>(
  name: Name
): ValueDefinition<Name, string>;

export function value<Value, const Name extends string = string>(
  name: Name,
  validate?: (value: Value) => boolean
): ValueDefinition<Name, Value>;

export function value(
  name: string,
  validate?: (value: any) => boolean
): ValueDefinition<string, any> {
  const create = (raw: unknown): unknown => {
    if (validate && !validate(raw)) {
      throw new TypeError(`Invalid value for "${name}".`);
    }

    return raw;
  };

  return create as ValueDefinition<string, unknown>;
}
