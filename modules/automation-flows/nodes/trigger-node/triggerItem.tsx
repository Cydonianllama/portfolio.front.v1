import { TriggerDTO } from "@/api/flow/trigger.dto";
import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TriggerItemProps = {
  data: TriggerDTO
}

export const TriggerItem = ({ data }: TriggerItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="border p-1 text-xs">
        {data.id}
      </div>
    </>
  )
}