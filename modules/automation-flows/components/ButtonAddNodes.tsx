import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import { automationFlowGenStore } from "../store/automation.flow.store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonAddNodesProps = {

}

export const ButtonAddNodes = ({ }: ButtonAddNodesProps) => {
  const appData = useAppData()
  const automationStore = automationFlowGenStore()

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