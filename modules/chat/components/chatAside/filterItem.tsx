import { FiInbox } from "react-icons/fi";
import { ALL_CHATS_FILTER_ID } from "./ListConversationPages";

type ConversationPageItemProps = {
  active?: boolean;
  data: {
    id: string,
    title?: string
    qty?: number
    icon?: string
  }
  onClick: (id: string) => void
}

export function FilterItem({ data, active, onClick }: ConversationPageItemProps) {
  return (<>
    <div onClick={() => { onClick(data.id) }} className={`flex p-2 items-center justify-between cursor-pointer select-none hover:bg-gray-100 rounded-md ${!active ? '' : 'text-blue-600 bg-blue-50/60'}`}>
      <div className="flex gap-2 items-center min-w-0">
        {data.id === ALL_CHATS_FILTER_ID && <FiInbox className="text-gray-400 shrink-0" />}
        {data.icon && data.id !== ALL_CHATS_FILTER_ID && <span className="text-base shrink-0">{data.icon}</span>}
        <span className="font-semibold text-sm text-foreground truncate">{data.title}</span>
      </div>
      <div className={` ${!active ? 'text-gray-400' : 'text-blue-600'} `}>
        {data.qty}
      </div>
    </div>
  </>)
}