/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { automationFlowGenStore } from "../store/automation.flow.store"
import { getNodeAction } from "../updaters/condition.updater";
import { MessageUpdater } from "../updaters/message.updater";
import { useConversationalFlowGenActions } from "./action.hooks.flow"
import { IAutomationNode } from "@erick/conversationalflow";

export const userEdgeActions = () => {

  const conversationalFlowGenActions = useConversationalFlowGenActions({})
  const information = automationFlowGenStore(state => state.information)

  // type conectionPrefixes = 'none' | 'rule-' | 'button-' | 'words-'

  const connectionsPrefixes = [
    'rule-',
    'button-',
    'words-',
    'other-response-',
    'not-response-'
  ]

  const removeConection = (nodeId: string, conectionId: string | null) => {
    try {

      console.log({ nodeId, conectionId })

      const nodeInformation = information?.nodeList?.find(el => el.id == nodeId)

      if (!nodeInformation) return;

      if (conectionId) {

        let matched = false

        for (const prex of connectionsPrefixes) {
          if (conectionId.startsWith(prex)) {
            matched = true;

            let configuration: any = null;

            if (nodeInformation.type == 'node.messaging.general.send.simple') {
              const messageUpdater = new MessageUpdater()
              const automationNodeToUpdate = messageUpdater.getNode(nodeInformation as IAutomationNode<'node.messaging.general.send.simple'>)

              if (prex == 'button-') {
                const id = conectionId
                const button = automationNodeToUpdate.configuration.buttons.find(el => el.id == id)
                if (button) button.nextNode = null;
                configuration = automationNodeToUpdate.configuration
                console.log(configuration)
              } else if (prex == 'words-') {
                const id = conectionId
                const word = automationNodeToUpdate.configuration.groupWords.find(el => el.id == id)
                if (word) word.nextNode = null
                configuration = automationNodeToUpdate.configuration
              } else if (prex == 'other-response-') {
                automationNodeToUpdate.configuration.otherResponseNextNode = null;
                configuration = automationNodeToUpdate.configuration
              } else if (prex == 'not-response-') {
                automationNodeToUpdate.configuration.notResponseNextNode = null;
                configuration = automationNodeToUpdate.configuration
              }

            } else if (nodeInformation.type == 'node.condition') {
              const node = getNodeAction(nodeInformation as IAutomationNode<'node.condition'>)
              if (node) {
                if (node.configuration?.rules) {
                  const id = conectionId
                  const rule = node.configuration.rules.find(el => el.id == id)
                  if (rule) rule.nextNode = null;
                  configuration = node.configuration
                }
              }
            }

            if (configuration) {
              conversationalFlowGenActions.UpdateNodeAction({
                id: nodeInformation.id,
                configuration: configuration,
                title: nodeInformation.title,
                type: nodeInformation.type,
                nextNode: nodeInformation.nextNode
              })
            }


            break;
          }
        }

        if (!matched) {
          conversationalFlowGenActions.UpdateNodeAction({
            id: nodeInformation.id,
            configuration: nodeInformation.configuration,
            title: nodeInformation.title,
            type: nodeInformation.type,
            nextNode: null
          })
        }

      } else {
        conversationalFlowGenActions.UpdateNodeAction({
          id: nodeInformation.id,
          configuration: nodeInformation.configuration,
          title: nodeInformation.title,
          type: nodeInformation.type,
          nextNode: null
        })
      }


    } catch {

    }
  }


  return {
    removeConection
  }


}