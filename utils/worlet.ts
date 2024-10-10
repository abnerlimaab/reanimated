type Worklet<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export function worklet<T extends (...args: any[]) => any>(fn: T): Worklet<T> {
  return function (...args: Parameters<T>) {
    "worklet";
    return fn(...args);
  };
}
