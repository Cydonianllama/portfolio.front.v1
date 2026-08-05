import { MessageDTO } from "@/api/chat/chat.dto";
import { useAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessagesCardProps = {
  data: MessageDTO
}

export const MessagesCard = ({ data }: MessagesCardProps) => {
  const appData = useAppData()

  return (
    <>
      <div className="text-sm border rounded p-2">
        {data.message}
      </div>
    </>
  )
}