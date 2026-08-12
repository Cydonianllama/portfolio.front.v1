import { ReactElement } from "react";
import { useAutomationNodeRegistry } from "../../registry/useAutomationNodeRegistry";
import { bgColor } from "../../registry/styles";
import type { AutomationNodeDefinition, NodeTypeValue, colorDefaultNode } from "../../registry/types";

export interface NodeToCreateConfiguration {
  title: string;
  description: string;
  icon: ReactElement;
  type: NodeTypeValue;
  category: "normal";
  color: colorDefaultNode;
}

export const useListSelectors = (): NodeToCreateConfiguration[] => {
  const registry = useAutomationNodeRegistry();

  return registry
    .filter((definition): definition is AutomationNodeDefinition => definition.canCreate === true)
    .map((definition) => {
      const Icon = definition.visual.icon;

      return {
        category: "normal" as const,
        description: definition.createDescription || "",
        icon: <Icon className={bgColor[definition.visual.color].textColor} />,
        title: definition.createLabel || definition.visual.title,
        type: definition.type as NodeTypeValue,
        color: definition.visual.color,
      };
    });
};
