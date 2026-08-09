// _____________ Configuración de Vitest
// Define el entorno de ejecución (jsdom = simula un navegador),
// los archivos de setup y el alias "@" usado en todo el proyecto.
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Entorno de navegador simulado (necesario para React Testing Library)
    environment: "jsdom",
    // Habilita describe/it/expect/vi como globales (opcional, aquí se importan explícitos)
    globals: true,
    // Archivo(s) que corren antes de cada suite para preparar matchers y limpieza
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      // Resuelve "@/" tal como lo define tsconfig.json (raíz de apps/web)
      "@": path.resolve(__dirname, "."),
    },
  },
});