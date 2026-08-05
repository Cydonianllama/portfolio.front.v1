/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import { RxHamburgerMenu } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useChatActions } from "../actions/useChatActions";
import { useChatStore } from "../store/store.chat";
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { HandleToSendMessageProp, TextAreaChat } from "./TextAreaChat";
import { MessagesShowcase } from "./MessagesShowcase";
import { ListConversationPagesSection } from "./ListConversationPages";
import { EmptySectionListContacts } from "./states/EmptySectionListContat";
import { ListingSectionListContacts } from "./states/ListingSectionListContacts";
import { NotRoomOpenedState } from "./states/NotRoomOpenedState";
import { InitConversationChat } from "./states/InitConversationChat";
import { ListingMessages } from "./states/ListingMessages";
import { ChatList } from "./ChatList";
import { ALL_CHATS_FILTER_ID } from "./ListConversationPages";
import { DialogManageConversationFilters } from "./DialogManageConversationFilters";
import { DialogCreateConversationFilter } from "./DialogCreateConversationFilter";
import { useCoversationFiltersStore } from "../store/store.conversationFilters";
import { CreationConversationFilterSchema } from "../schemas/createConversationFilter.schema";
import { DialogEditConversationFilter } from "./DialogEditConversationFilter";
import { DialogConfirmDeleteConversationFilter } from "./DialogConfirmConversationFilterDeletion";
import { UseAppInitializer } from "@/hooks/app/useAppInitiallizer";
import { useConversationFiltersActions } from "@/modules/chat/actions/useConversationFilters";
import { ChatAside } from "./chat-aside/chatAside";
import { useMessagesInfiniteScroll } from "../hooks/useMessagesInfiniteScroll";
import { useMessageRefs } from "../hooks/useMessageRefs";
import { useScrollToEndChat } from "../hooks/useChatScrollToEnd";
import { useMessageActions } from "../actions/useMessageActions";
import { useAsideChat } from "../hooks/useAsideChat";
import { useTextareaManager } from "../hooks/TextareaChat/useTextareaManager";
import { useTextareaResetter } from "../hooks/TextareaChat/useResetTextareaChat";
import { useChatManagerActions } from "../actions/useChatManagerActions";

export const ChatScreen = () => {
  // configuracion general de chat
  UseAppInitializer({ moduleName: 'chat' })
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const { HandleToggleAsideListConversations, openedAside } = useAsideChat()
  const { topRef, wrapperListMessagesRef } = useMessageRefs()

  // stores
  const conversationFilterStore = useCoversationFiltersStore()
  const chatStore = useChatStore()

  // actions
  const conversationFilterActions = useConversationFiltersActions()
  const chatActions = useChatActions()
  const messageActions = useMessageActions()
  const chatManagerActions = useChatManagerActions(chatStore)

  useMessagesInfiniteScroll({
    handleLoadMore: messageActions.LoadMoreMessages,
    topRef: topRef,
    wrapperListMessagesRef: wrapperListMessagesRef,
  })

  useScrollToEndChat({
    wrapperListMessagesRef
  })

  // textarea chat
  const { message, reset, setMessage } = useTextareaManager()
  useTextareaResetter(reset, chatStore)

  const currentFilterData = conversationFilterStore.listConvesationFilters.find(el => el.id == chatStore.filter)

  const HandleOpenChat = (roomId: string) => {
    chatActions.OpenChatAction({ roomId: roomId })
  }

  const HandleToSendMessage = (data: HandleToSendMessageProp) => {
    messageActions.SendMessageAction({
      message: data.message,
      roomId: chatStore.roomIdOpened || ''
    })
  }

  // cuando cambia de workspace
  useEffect(() => {
    if (workspaceSelectionStore.selectedWorkspaceId) {
      chatActions.ResetChat()
      messageActions.ResetMessages()
      reset() // reset del textarea de chat
      chatManagerActions.resetChatManager()
    }
  }, [workspaceSelectionStore.selectedWorkspaceId])

  //
  // Dialog create conversation filter
  //

  const HandleToCreateConversationItem = (data: CreationConversationFilterSchema) => {
    conversationFilterActions.CreateConversationFilterAction({
      name: data.name || '',
      workspaceId: workspaceSelectionStore.selectedWorkspaceId || ''
    })
  }

  return (<>
    <div className="w-full border-t  h-full flex flex-col">
      <div className="flex h-full">
        {/* start:aside */}
        <div className={`${openedAside ? 'w-65' : 'w-0'}  h-full  overflow-hidden transition-all duration-175`}>

          <div className={`w-65 max-w-65 min-w-65 border-r h-full flex flex-col`}>

            {/*  */}
            <div className="flex justify-between px-2 h-15 items-center">
              <h1 className="font-semibold text-foreground">Inbox</h1>
              <div>
                <Button variant={'ghost'} size={'icon'}>
                  <IoSearch />
                </Button>
              </div>
            </div>
            {/*  */}

            {/*  */}
            <ListConversationPagesSection
              listConvesationFilters={conversationFilterStore.listConvesationFilters}
              handleOpenManageConversationFilter={() => {
                conversationFilterStore.setDialogs({ manageDialogOpen: true })
              }}
              onClickOpenConversationFilter={(id) => {
                if (id === ALL_CHATS_FILTER_ID) {
                  // "todos los chats": listar sin filtro
                  chatActions.ListChatsAction({
                    page: 1,
                    workspaceId: workspaceSelectionStore.selectedWorkspaceId || '',
                  })
                  return;
                }
                chatActions.ListChatsAction({
                  page: 1,
                  workspaceId: workspaceSelectionStore.selectedWorkspaceId || '',
                  filter: id
                })
              }}
            />
            {/*  */}

          </div>

        </div>
        {/* end:aside */}

        {/* start-leftsidechat  */}
        <div className="w-70 flex flex-col h-full min-h-0 border-r">
          {/*  */}
          <div className="border-b h-15 px-2 flex items-center gap-2">
            <Button className={'cursor-pointer'} onClick={HandleToggleAsideListConversations} variant={'ghost'} size={'icon'}>
              <RxHamburgerMenu />
            </Button>
            {currentFilterData ? (<span className="font-semibold text-foreground">{currentFilterData.name || ''}</span>)
              : (<span className="font-semibold text-foreground">Todos los chats</span>)}
          </div>
          {/*  */}

          {/*  */}
          <div className="flex flex-1 flex-col overflow-auto min-h-0  w-full gap-6 ">
            {(chatStore.loadingChats && !chatStore.paginationChat) && (<ListingSectionListContacts />)}
            {(chatStore.paginationChat) && (<>
              {(chatStore.listChats.length == 0) && (<EmptySectionListContacts />)}
              {(chatStore.listChats.length > 0) && (
                <ChatList
                  HandleOpenChat={HandleOpenChat}
                  contacts={chatStore.listChats || []}
                  handleLoadMoreContacts={chatActions.LoadMoreChats}
                />
              )}
            </>)}
          </div>
          {/*  */}
        </div>
        {/* end:leftside-chat */}

        {/*  */}
        {!chatStore.roomIdOpened && (<NotRoomOpenedState />)}
        {chatStore.roomIdOpened && (<>
          <div className="flex-1 flex h-full min-h-0 min-w-0 overflow-hidden">
            {/* start:content wrapper */}
            <div className="border-r flex-1 min-h-0 flex flex-col">
              {/* start::Header content  */}
              <div className="h-15 w-full border-b min-h-0  items-center justify-between flex px-2">
                <div>
                  <h1 className="font-semibold">{chatStore.contactIndividualOpenedInformation?.fullname}</h1>
                </div>
                <div>
                  actions
                </div>
              </div>
              {/* end:Header content */}

              {/* start:message content */}
              {(chatStore.listingMessages) && (
                <ListingMessages />
              )}
              {!chatStore.listingMessages && (<>
                {chatStore.messages.length == 0 && (
                  <InitConversationChat />
                )}
                {chatStore.messages.length > 0 && (
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
            <div className="w-65 flex-col min-h-0 overflow-y-auto">
              <ChatAside />
            </div>
            {/*  */}
          </div>
        </>)}


        {/*  */}

      </div>
    </div>

    <DialogManageConversationFilters
      open={conversationFilterStore.manageDialogOpen}
      setOpen={(open) => { conversationFilterStore.setDialogs({ manageDialogOpen: open }) }}
      conversationsFilter={conversationFilterStore.listConvesationFilters}
      onClickCreate={() => {
        conversationFilterStore.setDialogs({ creationDialogOpen: true })
      }}
      onClickEdit={(item) => {
        conversationFilterStore.setDialogs({ updateDialogOpen: true, currentItemInAction: item })
      }}
      onClickDelete={(item) => {
        conversationFilterStore.setDialogs({ deleteDialogOpen: true, currentItemInAction: item })
      }}
    />

    <DialogCreateConversationFilter
      open={conversationFilterStore.creationDialogOpen}
      setOpen={(open) => conversationFilterStore.setDialogs({ creationDialogOpen: open })}
      creating={false}
      onCreate={HandleToCreateConversationItem}
    />

    <DialogEditConversationFilter
      open={conversationFilterStore.updateDialogOpen}
      setOpen={(open) => conversationFilterStore.setDialogs({ updateDialogOpen: open })}
      onUpdate={(data) => {
        conversationFilterActions.UdpateConversationFilterAction({ id: conversationFilterStore.currentItemInAction?.id || '', name: data.name || '' })
      }}
      updating={conversationFilterStore.updating}
      data={conversationFilterStore.currentItemInAction || null}
    />

    <DialogConfirmDeleteConversationFilter
      open={conversationFilterStore.deleteDialogOpen}
      deleting={conversationFilterStore.deleting}
      onDelete={() => {
        conversationFilterActions.DeleteConversationFilterAction({ id: conversationFilterStore.currentItemInAction?.id || '' })
      }}
      setOpen={(open) => conversationFilterStore.setDialogs({ deleteDialogOpen: open })}
    />

  </>)
}