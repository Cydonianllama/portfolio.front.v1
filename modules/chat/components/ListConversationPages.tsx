import { Button } from "@/components/ui/button"
import { FaRegUser } from "react-icons/fa"

type ConversationPageItemProps = {
  active?: boolean;
  data: {
    title?: string
    qty?: number
  }
}

const ConversationPageItem = ({ data, active }: ConversationPageItemProps) => {
  return (<>
    <div className={ `flex p-2 items-center justify-between cursor-pointer select-none hover:bg-gray-100 rounded-md ${!active ? '' : 'text-blue-600'}`}>
      <div className="flex gap-2 items-center">
        <FaRegUser />
        <span className="font-semibold">{data.title}</span>
      </div>
      <div className={` ${!active ? 'text-gray-400' : 'text-blue-600'} `}>
        {data.qty}
      </div>
    </div>
  </>)
}

type ListConversationPagesSection = {
  handleOpenManageConversationFilter: () => void;
}

export const ListConversationPagesSection = ({ handleOpenManageConversationFilter } : ListConversationPagesSection) => {
  return (<>
    <div className="px-2">
      <h2 className="font-semibold">Conversations</h2>
      <div>
        <ConversationPageItem data={{ qty: 20, title: 'You' }} />
        <ConversationPageItem data={{ qty: 1, title: 'Mentions' }} />
        <ConversationPageItem active data={{ qty: 200, title: 'All' }} />
        <ConversationPageItem data={{ qty: 1, title: 'Unasigned' }} />
        <ConversationPageItem data={{ qty: 800, title: '[Sales]' }} />
        <ConversationPageItem data={{ qty: 34, title: 'VIP Support' }} />
        <ConversationPageItem data={{ qty: 2, title: 'Global Sales' }} />
        <ConversationPageItem data={{ qty: 200, title: 'Early' }} />
      </div>
      <div>
        <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400'} variant={'ghost'} >Show 20 hidden</Button>
      </div>
    </div>
  </>)
}