/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import '../styles/layout.css'

import { useEffect } from "react";
import { useChatActions } from "../actions/useChatActions";
import { useChatStore } from "../store/store.chat";
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { useCoversationFiltersStore } from "../store/store.conversationFilters";
import { UseAppInitializer } from "@/hooks/app/useAppInitiallizer";
import { useMessageActions } from "../actions/useMessageActions";
import { useAsideChat } from "../hooks/useAsideChat";
import { useChatManagerActions } from "../actions/useChatManagerActions";
import { RoomsSection } from "./roomSections";
import { ButtonToggleAside } from "./ButtonToggleAside";
import { useTextareaResetter } from "../hooks/TextareaChat/useResetTextareaChat";
import { useTextareaManager } from "../hooks/TextareaChat/useTextareaManager";
import { useScrollMessagesToEnd } from "../hooks/useChatScrollToEnd";
import { useMessageRefs } from "../hooks/useMessageRefs";
import { useMessagesInfiniteScroll } from "../hooks/useMessagesInfiniteScroll";
import { ShowcaseRoom } from "./showcaseRoom/showcaseRoom";
import { ChatAside } from './chatAside/chatAside';

export const ChatScreen = () => {
  // configuracion general de chat
  UseAppInitializer({ moduleName: 'chat' })
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const { HandleToggleAsideListConversations, openedAside } = useAsideChat()

  // stores
  const conversationFilterStore = useCoversationFiltersStore()
  const chatStore = useChatStore()

  // actions
  const chatActions = useChatActions()
  const messageActions = useMessageActions()
  const chatManagerActions = useChatManagerActions(chatStore)

  const currentFilterData = conversationFilterStore.listConvesationFilters.find(el => el.id == chatStore.filter)

  // cuando cambia de workspace
  useEffect(() => {
    if (workspaceSelectionStore.selectedWorkspaceId) {
      chatActions.ResetChat()
      messageActions.ResetMessages()
      //TODO:reset() // reset del textarea de chat
      chatManagerActions.resetChatManager()
    }
  }, [workspaceSelectionStore.selectedWorkspaceId])

  // textarea chat (envio de mensaje)
  const { message, reset, setMessage } = useTextareaManager()
  useTextareaResetter(reset, chatStore)

  // messages hooks and props (manager de mensajes)
  const { topRef, wrapperListMessagesRef } = useMessageRefs()

  // paginacion infinita para mensajes
  useMessagesInfiniteScroll({
    handleLoadMore: messageActions.LoadMoreMessages,
    topRef: topRef,
    wrapperListMessagesRef: wrapperListMessagesRef,
  })

  // mover los mensaje al primero (abajo) al terminar de listarlos
  useScrollMessagesToEnd({
    wrapperListMessagesRef
  })

  return (<>
    <div className="w-full border-t  h-full flex flex-col">
      <div className="flex h-full">
        {/* start:aside */}
        <div className={`${openedAside ? 'w-[var(--chat-aside-width)]' : 'w-0'}  h-full  overflow-hidden transition-all duration-175`}>
          <ChatAside />
        </div>
        {/* end:aside */}

        {/* start-leftsidechat  */}
        <div className="w-[var(--chat-listsection-width)] flex flex-col h-full min-h-0 border-r">
          {/*  */}
          <div className="border-b h-[var(--chat-header-height)] px-2 flex items-center gap-2">
            <ButtonToggleAside
              HandleToggleAsideListConversations={HandleToggleAsideListConversations}
            />

            {/* Nombre */}
            {
              currentFilterData ?
                (<span className="font-semibold text-foreground">{currentFilterData.name || ''}</span>)
                : (<span className="font-semibold text-foreground">Todos los chats</span>)
            }

          </div>
          {/*  */}

          {/*  */}
          <div className="flex flex-1 flex-col overflow-auto min-h-0  w-full gap-6 ">
            <RoomsSection
              listChats={chatStore.listChats}
              loadingChats={chatStore.loadingChats}
              paginationChat={chatStore.paginationChat}
              chatActions={chatActions}
            />
          </div>
          {/*  */}
        </div>
        {/* end:leftside-chat */}

        {/*  */}
        <div className="flex-1 flex h-full min-h-0 min-w-0 overflow-hidden">
          <ShowcaseRoom
            listingMessages={chatStore.listingMessages}
            messages={chatStore.messages}
            room={chatStore.contactIndividualOpenedInformation}
            roomIdOpened={chatStore.roomIdOpened}
            chatStore={chatStore}
            messageActions={messageActions}
            // textarea
            message={message}
            setMessage={setMessage}
            // refs
            topRef={topRef}
            wrapperListMessagesRef={wrapperListMessagesRef}
          />
        </div>
        {/*  */}

      </div>
    </div>


  </>)
}