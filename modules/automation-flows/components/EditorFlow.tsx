import { automationFlowGenStore } from "../store/automation.flow.store";
import { useAutomationNodeRegistry } from "../registry/useAutomationNodeRegistry";
import { getEditorDefinition } from "../registry/registry.utils";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import type { IAutomationNode } from "@erick/conversationalflow";

type EditorFlowProps = {}

export const EditorFlow = ({ }: EditorFlowProps) => {
  const automationFlowStore = automationFlowGenStore()
  const registry = useAutomationNodeRegistry()
  const flowActions = useConversationalFlowGenActions({})

  const currentNode = automationFlowStore?.information?.nodeList?.find(el => el.id == automationFlowStore.currentNodeIdEditing)

  if (!currentNode) return <></>

  const definition = getEditorDefinition(registry, currentNode.type)
  if (!definition?.editor) return <></>

  const updateNode = (node: IAutomationNode) => {
    flowActions.UpdateNodeAction({
      id: node.id,
      configuration: node.configuration,
      title: node.title,
      type: node.type,
      nextNode: node.nextNode
    })
  }

  const Editor = definition.editor

  return (
    <>
      <div className="absolute top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-10">
        <Editor
          definition={definition}
          registry={registry}
          node={currentNode}
          updateNode={updateNode}
        />
      </div>
    </>
  )
}
