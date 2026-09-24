import type { Definition } from "@/internal";

export type Infer<T> = T extends Definition<infer Value> ? Value : never;
