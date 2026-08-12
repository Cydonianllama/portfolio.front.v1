/* eslint-disable react-hooks/rules-of-hooks */
import { automationFlowGenStore } from "../store/automation.flow.store";
import { useConversationalFlowGenActions } from "./action.hooks.flow";
import { useAutomationNodeRegistry } from "../registry/useAutomationNodeRegistry";
import { getNodeDefinition } from "../registry/registry.utils";
import { IAutomationNode } from "@erick/conversationalflow";

export const userEdgeActions = () => {
  const conversationalFlowGenActions = useConversationalFlowGenActions({});
  const information = automationFlowGenStore((state) => state.information);
  const registry = useAutomationNodeRegistry();

  const removeConection = (nodeId: string, conectionId: string | null) => {
    const nodeInformation = information?.nodeList?.find((el) => el.id == nodeId);

    if (!nodeInformation) return;

    const definition = getNodeDefinition(registry, nodeInformation.type);

    let nodeToUpdate: IAutomationNode | null = null;

    if (definition?.onDisconnect) {
      nodeToUpdate = definition.onDisconnect({
        node: nodeInformation,
        nodes: information?.nodeList || [],
        connectionId: conectionId,
      });
    }

    if (!nodeToUpdate) {
      nodeToUpdate = {
        ...nodeInformation,
        nextNode: null,
      };
    }

    conversationalFlowGenActions.UpdateNodeAction({
      id: nodeToUpdate.id,
      configuration: nodeToUpdate.configuration,
      title: nodeToUpdate.title,
      type: nodeToUpdate.type,
      nextNode: nodeToUpdate.nextNode,
    });
  };

  return {
    removeConection,
  };
};
