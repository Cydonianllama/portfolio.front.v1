import { TriggerDTO } from "@/api/flow/trigger.dto";
import { UseAppData } from "@/hooks/app/useAppData";
import { TriggerItem } from "./triggerItem";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TriggersSectionProps = {
  triggers: Array<TriggerDTO>
}

export const TriggersSection = ({ triggers }: TriggersSectionProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="pt-2">
        {triggers.map((el, index) => (
          <TriggerItem key={index} data={el} />
        ))}
      </div>
    </>
  )
}