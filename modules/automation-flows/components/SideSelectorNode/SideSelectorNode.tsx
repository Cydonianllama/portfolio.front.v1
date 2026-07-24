import { UseAppData } from "@/hooks/app/useAppData";
import { SelectorItem } from "./SelectorItem";
import { ListSelectors } from "./config";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SideSelectorNodeProps = {

}

export const SideSelectorNode = ({ }: SideSelectorNodeProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 w-80 border-l flex  z-10 bg-white py-4 px-4">
        <div className="flex flex-col gap-2 w-full">
          {ListSelectors.map((el, index) => <SelectorItem key={index} data={el} />)}
        </div>
      </div>
    </>
  )
}