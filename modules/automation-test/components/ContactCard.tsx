import { useAppData } from "@/hooks/app/useAppData";
import { UseAutomationTestHookActions } from "../hooks/hook.action.automationtest";
import { RoomDTO } from "@/api/chat/chat.dto";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ContactCardTestProps = {
  data: RoomDTO
}

export const ContactCardTest = ({ data }: ContactCardTestProps) => {
  const automationTestActions = UseAutomationTestHookActions({});
  const appData = useAppData()

  const HandleToClick = () => {
    automationTestActions.OpenChatAction(data.id || '')
  }

  return (
    <>
      <div className="text-xs border p-2 rounded cursor-pointer hover:bg-gray-50" onClick={HandleToClick}>
        {data.id}
      </div>
    </>
  )
}