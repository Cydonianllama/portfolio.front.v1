/* eslint-disable react/jsx-no-undef */
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";
import { Button } from "@/components/ui/button"
import { FaRegUser } from "react-icons/fa"
import { GoPlus } from "react-icons/go";



type ConversationPageItemProps = {
  active?: boolean;
  data: {
    title?: string
    qty?: number
  }
}

const ConversationPageItem = ({ data, active }: ConversationPageItemProps) => {
  return (<>
    <div className={`flex p-2 items-center justify-between cursor-pointer select-none hover:bg-gray-100 rounded-md ${!active ? '' : 'text-blue-600'}`}>
      <div className="flex gap-2 items-center">
        {/* <FaRegUser /> */}
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
  listConvesationFilters: ConversationFilterDTO[]
}

export const ListConversationPagesSection = ({ handleOpenManageConversationFilter, listConvesationFilters }: ListConversationPagesSection) => {
  return (<>
    <div className="px-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Conversations</h2>
        <div>
          {listConvesationFilters.length < 10 && (<>
            <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400 cursor-pointer'} variant={'ghost'} >
              <GoPlus />
            </Button>
          </>)}
        </div>
      </div>
      <div>
        {listConvesationFilters.map((el, index) => <ConversationPageItem active={index == 0 ? true : false} key={index} data={{ qty: 19, title: el.name }} />)}
      </div>
      {listConvesationFilters.length > 10 && (<>
        <div>
          <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400'} variant={'ghost'} >
            {listConvesationFilters.length > 10 && <span>Mostrar <strong>listConvesationFilters.length</strong> ocultos</span>}
            {listConvesationFilters.length < 10 && <GoPlus />}
          </Button>
        </div>

      </>)}

    </div>
  </>)
}