/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IAutomationNode, nodeTypes } from "@erick/conversationalflow";
import { FlowEdge, nodesFlow } from "../engineSimple/types";




const foundeNodeFromId = (id: string, nodes: Array<IAutomationNode>): IAutomationNode | null => {
  return nodes.find(el => el.id == id) || null
}

export const BuildNodeAndEdges = ({ nodes }: { nodes: Array<IAutomationNode> }): { nodes: Array<nodesFlow>, edges: FlowEdge[]; } => {
  console.log('BuildNodeAndEdges')

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
          id: `edge---next-${node.id}-${node.nextNode}`,
          source: `${node.id}`,
          target: `${node.nextNode}`,
        })
      } else {
        console.warn(`node.nextNode ${node.nextNode} not founded`)
      }
    }

    if (node.type == nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE) {
      // buttons

      const messageNode = node as IAutomationNode<typeof nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE>

      if (messageNode.configuration) {

        // special connections: not response / other response
        if (messageNode.configuration.notResponseNextNode) {
          if (foundeNodeFromId(messageNode.configuration.notResponseNextNode, nodes)) {
            edgesToSend.push({
              id: `edge---not-response-${node.id}`,
              source: node.id,
              sourceHandle: `not-response-${node.id}`,
              target: messageNode.configuration.notResponseNextNode,
            })
          }
        }

        if (messageNode.configuration.otherResponseNextNode) {
          if (foundeNodeFromId(messageNode.configuration.otherResponseNextNode, nodes)) {
            edgesToSend.push({
              id: `edge---other-response-${node.id}`,
              source: node.id,
              sourceHandle: `other-response-${node.id}`,
              target: messageNode.configuration.otherResponseNextNode,
            })
          }
        }

        // buttons
        if (messageNode.configuration.buttons) {
          let idx = 0
          for (const button of messageNode.configuration.buttons) {
            if (button.nextNode) {
              if (foundeNodeFromId(button.nextNode, nodes)) {
                edgesToSend.push({
                  id: `edge---${button.id}-${node.id}-${idx}`,
                  source: node.id,
                  sourceHandle: button.id,
                  target: button.nextNode,
                })
              } else {
                console.warn(`button.nextNode ${node.nextNode} not founded`)
              }
            }
            idx++;
          }
        }

        // words
        if (messageNode.configuration.groupWords) {
          let idx = 0
          for (const groupWord of messageNode.configuration.groupWords) {
            if (groupWord.nextNode) {
              edgesToSend.push({
                id: `edge---${groupWord.id}-${node.id}-${idx}`,
                source: node.id,
                sourceHandle: groupWord.id,
                target: groupWord.nextNode,
              })
            }
            idx++;
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
                let idx = 0;
                for (const option of list.options) {
                  if (option.nextNode) {
                    if (foundeNodeFromId(option.nextNode, nodes)) {
                      edgesToSend.push({
                        id: `edge---${node.id}-${node.id}-${idx}`,
                        source: node.id,
                        sourceHandle: option.id,
                        target: option.nextNode,
                      })
                    } else {
                      console.warn(`option.nextNode ${node.nextNode} not founded`)
                    }
                  }
                  idx++;
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
                  id: `edge---${node.id}-${rule.id}-${idx}`,
                  sourceHandle: rule.id,
                  target: rule.nextNode,
                  source: node.id,
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

  // console.log({
  //   nodes: nodesToSend,
  //   edges: edgesToSend
  // })

  return {
    nodes: nodesToSend,
    edges: edgesToSend
  }
}
