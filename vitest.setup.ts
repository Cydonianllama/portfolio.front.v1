// _____________ Setup global de Vitest (apps/web)
// Se ejecuta automáticamente antes de cada suite gracias a `setupFiles` en vitest.config.ts.
import "@testing-library/jest-dom/vitest";

// `@testing-library/react` registra su propio afterEach de limpieza:
// después de cada test desmonta el DOM para no "contaminar" el siguiente test.
// Con `globals: true` eso funciona sin configuración adicional.