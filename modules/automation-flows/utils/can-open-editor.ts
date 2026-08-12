import type { AutomationNodeDefinition } from "../registry/types";
import { nodesFlow } from "../engineSimple/types";

export const canOpenEditor = (
  node: nodesFlow,
  registry: AutomationNodeDefinition[],
) => {
  const definition = registry.find((item) => item.type === node.type);
  return definition?.canOpenEditor ?? false;
};
