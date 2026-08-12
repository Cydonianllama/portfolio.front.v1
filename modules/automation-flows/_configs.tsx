/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType } from "react";
import { automationNodeRegistry } from "./registry/automation-node-registry";
import { withNodeDefinition } from "./registry/wrappers";
import { bgColor } from "./registry/styles";
import { FIRST_STEP_NODE, idFirstStep } from "./registry/constants";
import { nodeTypes } from "@erick/conversationalflow";
import { DefaultEdge } from "./edges/DefaultEdge";
import { edgeTypes } from "./engineSimple/edges.types";
import type { colorDefaultNode } from "./registry/types";

export type NodeTypeValue = (typeof nodeTypes)[keyof typeof nodeTypes];

export { FIRST_STEP_NODE, idFirstStep, bgColor };

export const edgeTypesConfiguration: Record<edgeTypes, ComponentType<any>> = {
  'default-edge': DefaultEdge,
};

export const nodeTypesConfigurations: Record<string, ComponentType<any>> = Object.fromEntries(
  automationNodeRegistry.map((definition) => [
    definition.type,
    withNodeDefinition(definition, automationNodeRegistry),
  ]),
);

type generalConfigurationNode = {
  icon: ComponentType<{ className: string }>,
  title: string
  description?: string
  color: colorDefaultNode
}

export const GeneralConfigurationNode: Record<string, generalConfigurationNode> = Object.fromEntries(
  automationNodeRegistry.map((definition) => [
    definition.type,
    {
      icon: definition.visual.icon,
      title: definition.visual.title,
      description: definition.visual.description,
      color: definition.visual.color,
    },
  ]),
);

export const EditorsConfiguration: Partial<Record<NodeTypeValue, { hasEditor: boolean, Editor: ComponentType | null }>> = Object.fromEntries(
  automationNodeRegistry
    .filter((definition) => definition.editor)
    .map((definition) => [
      definition.type,
      {
        hasEditor: true,
        Editor: definition.editor as unknown as ComponentType | null,
      },
    ]),
) as Partial<Record<NodeTypeValue, { hasEditor: boolean, Editor: ComponentType | null }>>;
