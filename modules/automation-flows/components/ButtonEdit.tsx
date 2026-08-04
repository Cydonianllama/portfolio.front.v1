import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonEditProps = {
  
}

export const ButtonEdit = ({  }: ButtonEditProps) => {
  // const useAppData = UseAppData()
  const conversarionalFlowActions = useConversationalFlowGenActions({})
  
  const HandleToEdit = () => {
    conversarionalFlowActions.SetModeAction('editor')
  }

  return (
    <>
      <Button variant={'outline'} onClick={HandleToEdit}>
        Editar
      </Button>
    </>
  )
}