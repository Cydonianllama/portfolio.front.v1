import { UseAppData } from "@/hooks/app/useAppData";
import { useAutomationFlow } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorNameProps = {
  
}

export const EditorName = ({  }: EditorNameProps) => {
  const useAppData = UseAppData()
  const automationFlowStore = useAutomationFlow()
  const currentAutomation = automationFlowStore.information?.automation
  return (
    <>
      <div className="font-semibold">
        {currentAutomation?.title}
      </div>
    </>
  )
}