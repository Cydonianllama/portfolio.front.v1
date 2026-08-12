import type { AutomationNodeDefinition } from "./types";

export const getNodeDefinition = (
  registry: AutomationNodeDefinition[],
  type: string | null | undefined,
) => registry.find((definition) => definition.type === type);

export const getEditorDefinition = (
  registry: AutomationNodeDefinition[],
  type: string | null | undefined,
) => registry.find((definition) => definition.type === type && definition.editor);

export const getCreatableDefinitions = (registry: AutomationNodeDefinition[]) =>
  registry.filter((definition) => definition.canCreate);
