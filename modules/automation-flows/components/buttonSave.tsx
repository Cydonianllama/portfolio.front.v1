import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { automationFlowGenStore } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonSaveProps = {
  disabled: boolean
}

export const ButtonSave = ({ disabled }: ButtonSaveProps) => {
  // const useAppData = UseAppData()

  const conversarionalFlowActions = useConversationalFlowGenActions({})
const information = automationFlowGenStore(state => state.information)

  const HandleSave = () => {
    conversarionalFlowActions.PublishAutomationAction({
      automationId: information?.automation?.id || ''
    })
  }

  return (
    <>
      <Button disabled={disabled} onClick={HandleSave} >
        Guardar
      </Button>
    </>
  )
}