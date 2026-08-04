/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseAppData } from "@/hooks/app/useAppData";
import { EditorsConfiguration, NodeTypeValue } from "../_configs";
import { automationFlowGenStore } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorFlowProps = {

}

export const EditorFlow = ({ }: EditorFlowProps) => {
  const useAppData = UseAppData()
  const automationFlowStore = automationFlowGenStore()

  const currentNode = automationFlowStore?.information?.nodeList?.find(el => el.id == automationFlowStore.currentNodeIdEditing)

  if (!currentNode) return <></>

  const currentNodeType = currentNode.type as NodeTypeValue
  const Editor = currentNodeType ? EditorsConfiguration[currentNodeType]?.Editor : undefined

  if (!Editor) return <></>

  return (
    <>
      <div className="absolute top-0 bottom-0 w-80 bg-white border-r border-gray-200 z-10">
        <Editor key={currentNode.id} />
      </div>
    </>
  )
}