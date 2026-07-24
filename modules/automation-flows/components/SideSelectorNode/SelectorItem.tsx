import { UseAppData } from "@/hooks/app/useAppData";
import { NodeToCreateConfiguration } from "./config";
import { FlowHookActions } from "../../hooks/action.hooks.flow";
import { useAutomationFlow } from "../../store/automation.flow.store";
import { bgColor } from "../../_configs";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SelectorItemProps = {
  data: NodeToCreateConfiguration
}

export const SelectorItem = ({ data }: SelectorItemProps) => {
  const useAppData = UseAppData()

  const flowActions = FlowHookActions({})
  const flowStore = useAutomationFlow()


  const HandleClick = () => {
    flowActions.CreateNodeAction({ automationId: flowStore.automationId || '', nodeType: data.type })
  }

  

  return (
    <>
      <div className="border p-2  flex gap-2 w-full rounded select-none cursor-pointer hover:bg-gray-50" onClick={HandleClick}>
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded flex justify-center items-center ${bgColor[data.color].classColor}`}>
            {data.icon}
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold leading-tight">{data.title}</h3>
          <p className="text-sm text-gray-500">{data.description}</p>
        </div>
      </div>
    </>
  )
}