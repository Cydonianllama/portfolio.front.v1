import { UseAppData } from "@/hooks/app/useAppData";
import { automationFlowGenStore } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorNameProps = {
  
}

export const EditorName = ({  }: EditorNameProps) => {
  const useAppData = UseAppData()
  const automationFlowStore = automationFlowGenStore()
  const currentAutomation = automationFlowStore.information?.automation
  return (
    <>
      <div className="font-semibold">
        {currentAutomation?.title}
      </div>
    </>
  )
}