// export function buildUpdate<T>(
//   fields: UpdateField<T>[]
// ): Partial<T> {
//   const result: Partial<T> = {};

//   for (const field of fields) {
//     result[field.param] = field.value;
//   }

//   return result;
// }