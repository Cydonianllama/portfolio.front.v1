import type { PropsWithChildren } from "react";
import { AutomationNodeRegistryContext } from "./AutomationNodeRegistryContext";
import { automationNodeRegistry } from "./automation-node-registry";
import type { AutomationNodeDefinition } from "./types";

type AutomationNodeRegistryProviderProps = PropsWithChildren<{
  registry?: AutomationNodeDefinition[];
}>;

export function AutomationNodeRegistryProvider({
  registry,
  children,
}: AutomationNodeRegistryProviderProps) {
  return (
    <AutomationNodeRegistryContext.Provider value={registry ?? automationNodeRegistry}>
      {children}
    </AutomationNodeRegistryContext.Provider>
  );
}
