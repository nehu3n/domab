export type Flow<Input, Dependencies, Output> = (
  input: Input,
  dependencies: Dependencies
) => Output;

export function flow<Input, Dependencies, Output>(
  implementation: Flow<Input, Dependencies, Output>
): Flow<Input, Dependencies, Output> {
  return implementation;
}
