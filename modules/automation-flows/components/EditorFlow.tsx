import { UseAppData } from "@/hooks/app/useAppData";
import { EditorsConfiguration } from "../_configs";
import { nodeTypes } from "@/flow-engines/simpleAutomation/models/node.automation.type";
import { useAutomationFlow } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorFlowProps = {

}

export const EditorFlow = ({ }: EditorFlowProps) => {
  const useAppData = UseAppData()
  const automationFlowStore = useAutomationFlow()

  const currentNode = automationFlowStore?.information?.nodeList?.find(el => el.id == automationFlowStore.currentNodeIdEditing)

  if (!currentNode) return <></>

  const currentNodeType = currentNode.type
  const Editor = currentNodeType ? EditorsConfiguration[currentNodeType]?.Editor : undefined

  if (!Editor) return <></>

  return (
    <>
      <div className="absolute top-0 bottom-0 w-80 bg-white border-r shadow z-10">
        <Editor />
      </div>
    </>
  )
}