import { IAutomationNode, nodeTypes } from "@erick/conversationalflow";
import { FlowEdge, nodesFlow } from "../engineSimple/types";
import { idFirstStep } from "../registry/constants";
import { findNodeById } from "../registry/behaviors";
import type { AutomationNodeDefinition } from "../registry/types";

type BuildNodeAndEdgesProps = {
  nodes: Array<IAutomationNode>;
  registry: Array<AutomationNodeDefinition>;
};

export const BuildNodeAndEdges = ({ nodes, registry }: BuildNodeAndEdgesProps): { nodes: Array<nodesFlow>; edges: FlowEdge[] } => {
  const nodesToSend: nodesFlow[] = [];
  const edgesToSend: FlowEdge[] = [];

  //TODO: validar si no tiene nodos

  // validar si es una automatizacion inicial (solo un nodo trigger)
  if (nodes.length == 1) {
    if (nodes[0].type == nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING) {
      const triggerNode = nodes[0];

      nodesToSend.push({
        id: idFirstStep,
        type: "first-step-node",
        data: {
          id: idFirstStep,
          type: "",
        },
        position: {
          x: (triggerNode.position?.x || 0) + 390,
          y: triggerNode.position?.y || 0,
        },
      });

      edgesToSend.push({
        id: "first-step-node---edge",
        source: triggerNode.id,
        target: idFirstStep,
      });
    }
  }

  for (const node of nodes) {
    nodesToSend.push({
      id: node.id,
      type: node.type,
      data: {
        id: node.id,
        type: node.type,
      },
      position: {
        x: node.position?.x || 0,
        y: node.position?.y || 0,
      },
    });

    // next node
    if (node.nextNode) {
      if (findNodeById(node.nextNode, nodes)) {
        edgesToSend.push({
          id: `edge---next-${node.id}-${node.nextNode}`,
          source: `${node.id}`,
          target: `${node.nextNode}`,
        });
      } else {
        console.warn(`node.nextNode ${node.nextNode} not founded`);
      }
    }

    const definition = registry.find((item) => item.type === node.type);
    if (definition?.buildEdges) {
      edgesToSend.push(...definition.buildEdges({ node, nodes }));
    }
  }

  return {
    nodes: nodesToSend,
    edges: edgesToSend,
  };
};
