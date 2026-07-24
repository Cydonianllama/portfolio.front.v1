import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import { useAutomationFlow } from "../store/automation.flow.store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonAddNodesProps = {

}

export const ButtonAddNodes = ({ }: ButtonAddNodesProps) => {
  const useAppData = UseAppData()
  const automationStore = useAutomationFlow()

  return (
    <>
      <div className="absolute top-3 right-2">
        <Button
          variant={'outline'}
          size={'icon-lg'}
          onClick={() => {
            automationStore.setSelectNode({ openSelectNode: true })
          }}
        >
          <FaPlus />
        </Button>
      </div>
    </>
  )
}