export declare const brand: unique symbol;
export declare const definition: unique symbol;

export type Brand<Value, Kind extends string, Name extends string> = Value & {
  readonly [brand]: {
    readonly kind: Kind;
    readonly name: Name;
  };
};

export interface Definition<Value> {
  readonly [definition]: Value;
}
