import { useAppData } from "@/hooks/app/useAppData";
import { StepItem } from "./StepItem";
import { StepsInitItem } from "./steps.init";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UXCardSteptVariantDefaultProps = {
  list: Array<StepsInitItem>
}

export const UXCardSteptVariantDefault = ({ list }: UXCardSteptVariantDefaultProps) => {
  const useAppData = useAppData()

  return (
    <>
      <div className="p-2 rounded-lg border bg-white">
        <div></div>
        <div className="space-y-2">
          {list.map((el, index) => <StepItem step={index + 1} data={el} key={index} />)}
        </div>
      </div>

    </>
  )
}