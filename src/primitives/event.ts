import type { Definition } from "@/internal";

type DomainEvent<Type extends string, Data> = Readonly<{
  type: Type;
  data: Data;
}>;

type EventFactory<Type extends string, Data> = [Data] extends [undefined]
  ? () => DomainEvent<Type, undefined>
  : (data: Data) => DomainEvent<Type, Data>;

type EventDefinition<Type extends string, Data> = Definition<
  DomainEvent<Type, Data>
> &
  Readonly<{
    type: Type;
  }> &
  EventFactory<Type, Data>;

export function event<const Type extends string>(
  type: Type
): EventDefinition<Type, undefined>;

export function event<Data, const Type extends string = string>(
  type: Type
): EventDefinition<Type, Data>;

export function event(type: string): EventDefinition<string, undefined> {
  const create = (data?: unknown) => ({
    data,
    type,
  });

  return Object.assign(create, {
    type,
  }) as EventDefinition<string, undefined>;
}
