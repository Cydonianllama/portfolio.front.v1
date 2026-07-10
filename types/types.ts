export type FieldToArray<T> = {
  [K in keyof T]: {
    param: K;
    value: T[K];
  }
}[keyof T];