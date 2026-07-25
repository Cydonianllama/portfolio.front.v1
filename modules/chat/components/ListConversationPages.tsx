/* eslint-disable react/jsx-no-undef */
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";
import { Button } from "@/components/ui/button"
import { FaRegUser } from "react-icons/fa"
import { GoPlus } from "react-icons/go";
import { useChatStore } from "../store/store.chat";



type ConversationPageItemProps = {
  active?: boolean;
  data: {
    id: string,
    title?: string
    qty?: number
  }
  onClick: (id: string) => void
}

const ConversationPageItem = ({ data, active, onClick }: ConversationPageItemProps) => {
  return (<>
    <div onClick={() => { onClick(data.id) }} className={`flex p-2 items-center justify-between cursor-pointer select-none hover:bg-gray-100 rounded-md ${!active ? '' : 'text-blue-600'}`}>
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
  onClickOpenConversationFilter: (id: string) => void;
  handleOpenManageConversationFilter: () => void;
  listConvesationFilters: ConversationFilterDTO[]
}

const QTY_SHOWING = 7;

export const ListConversationPagesSection = ({ handleOpenManageConversationFilter, onClickOpenConversationFilter, listConvesationFilters }: ListConversationPagesSection) => {

  const chatStore = useChatStore()

  return (<>
    <div className="px-2 flex-1 ">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-foreground">Conversations</h2>
        <div>
          {listConvesationFilters.length < QTY_SHOWING && (<>
            <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400 cursor-pointer'} variant={'ghost'} >
              <GoPlus />
            </Button>
          </>)}
        </div>
      </div>
      {listConvesationFilters.length > 0 && (<>
        <div className="">
          {listConvesationFilters.slice(0, QTY_SHOWING).map((el, index) => <ConversationPageItem onClick={onClickOpenConversationFilter} active={chatStore.filter == el.id ? true : false} key={index} data={{ qty: 19, title: el.name, id: el.id }} />)}
        </div>
      </>)}
      {listConvesationFilters.length == 0 && (<>
        <div className="h-25 flex items-center justify-center text-xs text-muted-foreground">
          No hay filtros
        </div>
      </>)}
      {listConvesationFilters.length > QTY_SHOWING && (<>
        <div>
          <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400'} variant={'ghost'} >
            {listConvesationFilters.length > QTY_SHOWING && <span>Mostrar <strong>{listConvesationFilters.length - QTY_SHOWING}</strong> ocultos</span>}
            {listConvesationFilters.length < QTY_SHOWING && <GoPlus />}
          </Button>
        </div>
      </>)}
    </div>
  </>)
}