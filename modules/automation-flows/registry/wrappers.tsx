import type { NodeProps } from "@xyflow/react";
import { useAutomationNode } from "../hooks/useAutomationNode";
import type {
  AutomationFlowNode,
  AutomationNodeComponent,
  AutomationNodeComponentProps,
  AutomationNodeDefinition,
} from "./types";

export const withNodeDefinition = (
  definition: AutomationNodeDefinition,
  registry: AutomationNodeDefinition[],
): AutomationNodeComponent => {
  const Component = definition.component;

  return function RegisteredNode(props: NodeProps<AutomationFlowNode>) {
    const nodeId = String(props.id || props.data?.id || "");
    const { getNodeConfiguration, currentNodeIdEditing } = useAutomationNode(nodeId);

    const componentProps = {
      ...props,
      definition,
      registry,
      getNodeConfiguration,
      isActive: currentNodeIdEditing == nodeId ? true : false
    } as AutomationNodeComponentProps;

    return <Component {...componentProps} />;
  };
};
