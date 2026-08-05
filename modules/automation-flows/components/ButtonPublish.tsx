import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { automationFlowGenStore } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonPublishProps = {
  
}

export const ButtonPublish = ({  }: ButtonPublishProps) => {
  // const appData = useAppData()

  const information = automationFlowGenStore(state => state.information)

  const conversationFlowActions = useConversationalFlowGenActions({})

  const HandleToClickPublish = () => {
    conversationFlowActions.PublishAutomationAction({
      automationId:  information?.automation?.id || '' 
    })
  }
  
  return (
    <>
      <Button onClick={HandleToClickPublish} variant={'default'}>
        Publicar
      </Button>
    </>
  )
}