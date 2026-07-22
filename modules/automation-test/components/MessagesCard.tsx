import { MessageDTO } from "@/api/chat/chat.dto";
import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessagesCardProps = {
  data: MessageDTO
}

export const MessagesCard = ({ data }: MessagesCardProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="text-sm border rounded p-2">
        {data.message}
      </div>
    </>
  )
}