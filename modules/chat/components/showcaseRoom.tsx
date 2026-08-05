import { MessageDTO } from "@/api/chat/chat.dto";
import { NotRoomOpenedState } from "../states/NotRoomOpenedState";
import { RoomDetail } from "./room-detail/roomDetail";
import { InitConversationChat } from "../states/InitConversationChat";
import { ListingMessages } from "../states/ListingMessages";

import { ContactDTO } from "@/api/contacts/contacts.dto";
import { ChatStore } from "../../store/store.chat";
import { useMessageActionsType } from "../../actions/useMessageActions";
import { RefObject } from "react";
import { HandleToSendMessageProp, TextAreaChat } from "./textAreaChat";
import { DropdownRoomActions } from "./dropdownRoomActionts";
import { MessagesShowcase } from "./messagesShowcase";

// import { useScrollMessagesToEnd } from "../../hooks/useChatScrollToEnd";
// import { useMessageRefs } from "../../hooks/useMessageRefs";
// import { useMessagesInfiniteScroll } from "../../hooks/useMessagesInfiniteScroll";
// import { useTextareaResetter } from "../../hooks/TextareaChat/useResetTextareaChat";
// import { useTextareaManager } from "../../hooks/TextareaChat/useTextareaManager";

type ShowcaseRoomProps = {
  // room
  roomIdOpened: string | null;
  room: ContactDTO | null

  // messages
  messages: Array<MessageDTO>
  listingMessages: boolean,

  // actions
  chatStore: ChatStore
  messageActions: useMessageActionsType


  // textarea
  message: string
  setMessage: (message: string) => void

  // refs
  wrapperListMessagesRef: RefObject<HTMLDivElement | null>,
  topRef: RefObject<HTMLDivElement | null>,
}

export const ShowcaseRoom = ({
  messageActions,
  roomIdOpened,
  room,
  messages,
  listingMessages,
  chatStore,
  //
  message,
  setMessage,
  // refs
  wrapperListMessagesRef,
  topRef
}: ShowcaseRoomProps) => {

  const HandleToSendMessage = (data: HandleToSendMessageProp) => {
    messageActions.SendMessageAction({
      message: data.message,
      roomId: roomIdOpened || ''
    })
  }

  return (<>
    {!roomIdOpened && (<NotRoomOpenedState />)}

    {roomIdOpened && (<>

      {/* start:content wrapper */}
      <div className="border-r flex-1 min-h-0 flex flex-col">
        {/* start::Header content  */}
        <div className="h-[var(--chat-header-height)] w-full border-b min-h-0  items-center justify-between flex px-2">
          <div>
            <h1 className="font-semibold text-foreground truncate w-50">{room?.fullname}</h1>
          </div>
          <div>
            <DropdownRoomActions />
          </div>
        </div>
        {/* end:Header content */}

        {/* start:message content */}
        {(listingMessages) && (
          <ListingMessages />
        )}
        {!listingMessages && (<>
          {messages.length == 0 && (
            <InitConversationChat />
          )}
          {messages.length > 0 && (
            <MessagesShowcase
              topRef={topRef}
              wrapperListMessagesRef={wrapperListMessagesRef}
              messages={chatStore.messages || []}
              loading={false}
            />
          )}
        </>)}
        {/* end:message content */}

        {/* start:footer */}
        <div className="min-h-40 max-h-70 px-2 bottom-0 py-2 ">
          <TextAreaChat
            message={message}
            setMessage={setMessage}
            sending={chatStore.sendingMessage}
            HandleToSendMessage={HandleToSendMessage}
          />
        </div>
        {/* end:footer */}
      </div>
      {/* end:content wrapper */}

      {/* aside-room-start */}
      <div className="w-[var(--chat-room-detail-width)] flex-col min-h-0 overflow-y-auto">
        <RoomDetail />
      </div>
      {/*  */}

    </>)}


  </>)

}