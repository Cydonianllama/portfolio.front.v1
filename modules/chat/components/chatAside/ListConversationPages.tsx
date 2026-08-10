/* eslint-disable react/jsx-no-undef */
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";
import { Button } from "@/components/ui/button"
import { GoPlus } from "react-icons/go";
import { FiInbox } from "react-icons/fi";
import { useChatStore } from "../../store/store.chat";
import { EmptyState } from "@/modules/automation-flows/components/states/EmptyState";
import { FilterItem } from "./filterItem";

// Filtro virtual "todos los chats" (no existe en BD)
export const ALL_CHATS_FILTER_ID = 'all-chats'


const ConversationPageItem = () => {
  
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
    <div className="px-2 flex-1 flex flex-col min-h-0">
      <div className="flex justify-between items-center py-2">
        <h2 className="font-semibold text-foreground text-sm">Conversations</h2>
        <div>
          <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400 cursor-pointer'} variant={'ghost'} size={'icon-sm'}>
            <GoPlus />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 space-y-0.5">
        {/* Item virtual "todos los chats" */}
        <FilterItem
          onClick={onClickOpenConversationFilter}
          active={chatStore.filter == ALL_CHATS_FILTER_ID}
          data={{ id: ALL_CHATS_FILTER_ID, title: 'Todos los chats' }}
        />

        {listConvesationFilters.length > 0 && (<>
          {listConvesationFilters.slice(0, QTY_SHOWING).map((el, index) => <FilterItem onClick={onClickOpenConversationFilter} active={chatStore.filter == el.id ? true : false} key={el.id || index} data={{ qty: 19, title: el.name, id: el.id, icon: el.icon }} />)}
        </>)}

        {listConvesationFilters.length == 0 && (<>
          <EmptyState
            title="Sin filtros"
            description="Crea filtros para organizar tus conversaciones."
          />
        </>)}

        {listConvesationFilters.length > QTY_SHOWING && (<>
          <div>
            <Button onClick={handleOpenManageConversationFilter} className={'text-gray-400 w-full'} variant={'ghost'} size={'sm'}>
              Mostrar <strong>{listConvesationFilters.length - QTY_SHOWING}</strong> ocultos
            </Button>
          </div>
        </>)}
      </div>
    </div>
  </>)
}
