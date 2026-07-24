/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Edge, Node } from "@xyflow/react";
import { IAutomationNode } from "@/flow-engines/simpleAutomation/models/node.automation"
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";

type nodesFlow = Node<{ id: string, type: string }>
type FlowEdge = Edge;


const foundeNodeFromId = (id: string, nodes: Array<IAutomationNode>): IAutomationNode | null => {
  return nodes.find(el => el.id == id) || null
}

export const BuildNodeAndEdges = ({ nodes }: { nodes: Array<IAutomationNode> }): { nodes: Array<nodesFlow>, edges: FlowEdge[]; } => {

  const nodesToSend: nodesFlow[] = []
  const edgesToSend: FlowEdge[] = []

  //TODO: validar si no tiene nodos

  // validar si es una automatizacion inicial (solo un nodo trigger)
  if (nodes.length == 1) {
    if (nodes[0].type == nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING) {

      const triggerNode = nodes[0]
      const idFirstStep = 'first-step-node'

      nodesToSend.push({
        id: idFirstStep,
        type: "first-step-node",
        data: {
          id: idFirstStep,
          type: ''
        },
        position: {
          x: (triggerNode.position?.x || 0) + 390,
          y: (triggerNode.position?.y || 0),
        },
      })

      edgesToSend.push({
        id: 'first-step-node---edge',
        source: triggerNode.id,
        target: idFirstStep,
      })
    }
  }

  for (const node of nodes) {

    nodesToSend.push({
      id: node.id,
      type: node.type,
      data: {
        id: node.id,
        type: node.type
      },
      position: {
        x: node.position?.x || 0,
        y: node.position?.y || 0,
      },
    })

    // next node
    if (node.nextNode) {
      if (foundeNodeFromId(node.nextNode, nodes)) {
        edgesToSend.push({
          id: `${node.id}---${node.nextNode}`,
          source: node.id,
          target: node.nextNode,
        })
      } else {
        console.warn(`node.nextNode ${node.nextNode} not founded`)
      }
    }

    if (node.type == nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE) {
      // buttons

      const messageNode = node as IAutomationNode<typeof nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE>

      if (messageNode.configuration) {
        if (messageNode.configuration.buttons) {
          for (const button of messageNode.configuration.buttons) {
            if (button.nextNode) {
              if (foundeNodeFromId(button.nextNode, nodes)) {
                edgesToSend.push({
                  id: `${node.id}---${node.nextNode}---${button.nextNode}`,
                  source: node.id,
                  sourceHandle: `next-${node.id || ''}`,
                  target: button.nextNode,
                })
              } else {
                console.warn(`button.nextNode ${node.nextNode} not founded`)
              }
            }
          }
        }
      }
    }

    if (node.type == nodeTypes.NODE_TYPE_GENERAL_MESSAGE_LIST) {
      // buttons

      const messageNode = node as IAutomationNode<typeof nodeTypes.NODE_TYPE_GENERAL_MESSAGE_LIST>

      if (messageNode.configuration) {
        if (messageNode.configuration.list) {
          if (messageNode.configuration.list.sections) {
            for (const list of messageNode.configuration.list.sections) {
              if (list.options) {
                for (const option of list.options) {
                  if (option.nextNode) {
                    if (foundeNodeFromId(option.nextNode, nodes)) {
                      edgesToSend.push({
                        id: `${node.id}---${node.nextNode}---${option.nextNode}`,
                        source: node.id,
                        sourceHandle: `next-${node.id || ''}`,
                        target: option.nextNode,
                      })
                    } else {
                      console.warn(`option.nextNode ${node.nextNode} not founded`)
                    }
                  }
                }
              }
            }
          }
        }
      }

    }

    if (node.type == nodeTypes.NODE_TYPE_CONDITION) {

      const conditionNode = node as IAutomationNode<typeof nodeTypes.NODE_TYPE_CONDITION>

      if (conditionNode.configuration) {
        if (conditionNode.configuration.rules) {
          let idx = 0;
          for (const rule of conditionNode.configuration.rules) {

            if (rule.nextNode) {
              if (foundeNodeFromId(rule.nextNode, nodes)) {
                edgesToSend.push({
                  id: `${node.id}---${node.nextNode}---${rule.nextNode}`,
                  source: node.id,
                  sourceHandle: `condition-${node.id}-${idx}`,
                  target: rule.nextNode,
                })
              } else {
                console.warn(`rule.nextNode ${node.nextNode} not founded`)
              }
            }
            idx++;
          }
        }
      }

    }
  }

  return {
    nodes: nodesToSend,
    edges: edgesToSend
  }
}
