import { RoomDTO } from "@/api/chat/chat.dto";
import { RoomList } from "./roomsSection/roomList"
import { EmptySectionListContacts } from "./states/EmptySectionListContat";
import { ListingSectionListContacts } from "./states/ListingSectionListContacts";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { useChatActionsType } from "../actions/useChatActions";

export type RoomsSectionProps = {
  loadingChats: boolean;
  paginationChat: ResponsePagination | null,
  listChats: Array<RoomDTO>

  //
  chatActions: useChatActionsType
}

export const RoomsSection = ({ loadingChats, paginationChat, listChats, chatActions } : RoomsSectionProps) => {
  const HandleOpenChat = (roomId: string) => {
    chatActions.OpenChatAction({ roomId: roomId })
  }

  return (<>
    {(loadingChats && !paginationChat) && (<ListingSectionListContacts />)}
    {(paginationChat) && (<>
      {(listChats.length == 0) && (<EmptySectionListContacts />)}
      {(listChats.length > 0) && (
        <RoomList
          HandleOpenChat={HandleOpenChat}
          contacts={listChats || []}
          handleLoadMoreContacts={chatActions.LoadMoreChats}
        />
      )}
    </>)}
  </>)
} 