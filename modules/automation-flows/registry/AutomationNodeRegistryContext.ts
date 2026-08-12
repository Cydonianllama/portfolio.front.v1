import { createContext } from "react";
import type { AutomationNodeDefinition } from "./types";

export const AutomationNodeRegistryContext = createContext<AutomationNodeDefinition[]>([]);
