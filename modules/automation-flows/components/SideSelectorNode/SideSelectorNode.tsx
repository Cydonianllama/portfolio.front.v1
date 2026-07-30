import { UseAppData } from "@/hooks/app/useAppData";
import { SelectorItem } from "./SelectorItem";
import { ListSelectors } from "./config";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { automationFlowGenStore } from "../../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SideSelectorNodeProps = {

}

export const SideSelectorNode = ({ }: SideSelectorNodeProps) => {
  const useAppData = UseAppData()

  const automationFlowStore = automationFlowGenStore()

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 w-80 border-l flex flex-col  z-10 bg-white pb-4">
        <div className="px-4 py-4 w-full border-b flex justify-between items-center">
          <span className="font-semibold">Nodos</span>
          <Button onClick={() => { automationFlowStore.setSelectNode({ openSelectNode: false }) }} variant={'outline'} size={'icon-sm'}>
            <IoCloseSharp />
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-full px-4 pt-4">
          {ListSelectors.map((el, index) => <SelectorItem key={index} data={el} />)}
        </div>
      </div>
    </>
  )
}