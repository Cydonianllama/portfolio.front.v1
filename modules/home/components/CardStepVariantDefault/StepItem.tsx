import { useAppData } from "@/hooks/app/useAppData";
import { StepsInitItem } from "./steps.init";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type StepItemProps = {
  data: StepsInitItem
  step: number
}

export const StepItem = ({ data, step }: StepItemProps) => {
  const useAppData = useAppData()
  return (
    <>
      <div>
        <div className="flex gap-2 items-center">
          <div className="h-5 w-5 flex justify-center items-center rounded-full border font-semibold text-xs text-ui-er-card border-ui-er-card">{step}</div>
          <div className="font-semibold text-ui-er-card">{data.title}</div>
        </div>
      </div>
    </>
  )
}