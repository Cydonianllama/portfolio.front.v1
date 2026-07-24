/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Edge, Node } from "@xyflow/react";
import { IAutomationNode } from "@/flow-engines/simpleAutomation/models/node.automation"
import { NodeType } from "@/flow-engines/simpleAutomation/models/node.automation.type";
import { NodeMessageType } from "@/flow-engines/simpleAutomation/models/node.message.type";
import { nodeTypes } from "../engineSimple/node.types";

type nodesFlow = Node<{ id: string, type: NodeType }>
type FlowEdge = Edge;

const getnodeType = (node: IAutomationNode): nodeTypes => {
  if (node.type == NodeType.action) {
    return nodeTypes.action
  }

  if (node.type == NodeType.message) {
    return nodeTypes.message
  }

  if (node.type == NodeType.trigger) {
    return nodeTypes.trigger
  }

  if (node.type == NodeType.condition) {
    return nodeTypes.condition
  }

  return nodeTypes.message;
}

const foundeNodeFromId = (id: string, nodes: Array<IAutomationNode>): IAutomationNode | null => {
  return nodes.find(el => el.id == id) || null
}

export const BuildNodeAndEdges = ({ nodes }: { nodes: Array<IAutomationNode> }): { nodes: Array<nodesFlow>, edges: FlowEdge[]; } => {

  const nodesToSend: nodesFlow[] = []
  const edgesToSend: FlowEdge[] = []

  //TODO: validar si no tiene nodos

  // validar si es una automatizacion inicial (solo un nodo trigger)
  if (nodes.length == 1) {
    if (nodes[0].type == NodeType.trigger) {

      const triggerNode = nodes[0]
      const idFirstStep = 'first-step-node'

      nodesToSend.push({
        id: idFirstStep,
        type: nodeTypes.firstStep,
        data: {
          id: idFirstStep,
          type: NodeType.action
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
      type: getnodeType(node),
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


    // conections from node types
    if (node.type == NodeType.message) {

      // buttons
      if (node.message?.type == NodeMessageType.Message) {
        if (node.message.configMessage) {
          if (node.message.configMessage.buttons) {
            for (const button of node.message.configMessage.buttons) {
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

      // list options
      if (node.message?.type == NodeMessageType.List) {
        if (node.message.configList) {
          if (node.message.configList.list) {
            if (node.message.configList.list.sections) {
              for (const list of node.message.configList.list.sections) {
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

    } else if (node.type == NodeType.condition) {
      if (node.condition) {
        if (node.condition.rules) {
          let idx = 0;
          for (const rule of node.condition.rules) {

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