/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import { RxHamburgerMenu } from "react-icons/rx";

import {
  ItemGroup,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";

import { RiWhatsappLine } from "react-icons/ri";
import { useCallback, useEffect, useRef, useState } from "react";
import { UseChatActions } from "../../../hooks/chat/useChatActions";
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
import { Separator } from "@/components/ui/separator";
import { MdOutlineAlternateEmail, MdOutlineMapsHomeWork, MdOutlinePhone } from "react-icons/md";
import { DialogManageConversationFilters } from "./DialogManageConversationFilters";
import { DialogCreateConversationFilter } from "./DialogCreateConversationFilter";
import { useCoversationFiltersStore } from "../store/store.conversationFilters";
import { CreationConversationFilterSchema } from "../schemas/createConversationFilter.schema";
import { DialogEditConversationFilter } from "./DialogEditConversationFilter";
import { DialogConfirmDeleteConversationFilter } from "./DialogConfirmConversationFilterDeletion";
import { UseAppInitializer } from "@/hooks/app/useAppInitiallizer";
import { UseConversationFiltersActions } from "@/hooks/chat/useConversationFilters";

export const ChatScreen = () => {
  // configuracion general de chat
  UseAppInitializer({ moduleName: 'chat' })

  const conversationFilterActions = UseConversationFiltersActions()
  const conversationFilterStore = useCoversationFiltersStore()
  const chatStore = useChatStore()
  const chatActions = UseChatActions()
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const currentFilterData = conversationFilterStore.listConvesationFilters.find(el => el.id == chatStore.filter)

  const [resetSignal, setResetSignal] = useState(0);

  const handleResetAll = () => {
    // limpiar textarea
    handleResetTextarea()

    // contact
    chatStore.setStates({ paginationChat: null })

    // limpiar mensajes y estado de room opened
    chatStore.setChatSelectedStates({ messages: [], roomIdOpened: null, paginationMessages: null })

    // limpiar informacion de contacto
    chatStore.setIndividualContact({ contactIndividualOpenedInformation: null })

  }

  const handleResetTextarea = () => {
    setResetSignal((prev) => prev + 1);
  };


  const HandleOpenChat = (roomId: string) => {
    chatActions.OpenChatAction({ roomId: roomId })
  }

  const HandleToSendMessage = (data: HandleToSendMessageProp) => {
    chatActions.SendMessageAction({
      message: data.message,
      roomId: chatStore.roomIdOpened || ''
    })
  }

  //
  // LISTADO DE MENSAJES
  //

  // si el envío del mensaje es exitoso
  useEffect(() => {
    if (!chatStore.sendingMessage && chatStore.successSendingMessage) {
      handleResetTextarea()
    }
  }, [chatStore.sendingMessage, chatStore.successSendingMessage])

  // si el usuario cambia de session abierta
  useEffect(() => {
    if (chatStore.roomIdOpened) {
      handleResetTextarea()
    }
  }, [chatStore.roomIdOpened])

  // Listar más mensajes
  const handleLoadMore = useCallback(() => {
    if (chatStore.listingMessages) {
      console.log("[INTERSECTION OBSERVER] not running is listing messages");
      return;
    }

    if (chatStore.openingChat) {
      console.log("[INTERSECTION OBSERVER] not running is opening chat");
      return;
    }

    let page = 1;

    if (chatStore.paginationMessages) {
      if (chatStore.paginationMessages.hasNextPage) {
        page = (chatStore?.paginationMessages?.page || 0) + 1;
      } else {
        console.log('No hay más paginas que listar')
        return;
      }
    }
    console.log("Cargar más mensajes");
    chatActions.ListMessagesAction({ page: page, roomId: chatStore.roomIdOpened || '' })
  }, [chatStore.listingMessages, chatStore.openingChat, chatStore.paginationMessages, chatStore.roomIdOpened]);

  // referencias de la seccion del listado de mensajes
  const topRef = useRef<HTMLDivElement>(null);
  const wrapperListMessagesRef = useRef<HTMLDivElement>(null)

  const scrollToEndChat = () => {
    requestAnimationFrame(() => {
      if (wrapperListMessagesRef.current) {
        wrapperListMessagesRef.current.scrollTo({
          top: wrapperListMessagesRef.current.scrollHeight,
          behavior: "instant",
        });
      }
    });
  }

  // cuando termina de listar los mensajes ()
  useEffect(() => {
    if (chatStore.successListingMessages) {
      // scrollToEndChat()
    }
  }, [chatStore.successListingMessages])

  // cuando termina de abrir el chat (scrollear al final)
  useEffect(() => {
    if (chatStore.hasSuccessOpeningChat) {
      console.log('terminó de abrir el chat - scrolear hacia abajo')
      scrollToEndChat()
    }
  }, [chatStore.hasSuccessOpeningChat])

  // cuando cambia de workspace
  useEffect(() => {
    if (workspaceSelectionStore.selectedWorkspaceId) {
      handleResetAll()
    }
  }, [workspaceSelectionStore.selectedWorkspaceId])

  //
  // logica para el aside
  //
  const [openedAside, setOpenAside] = useState(true)
  const HandleToggleAsideListConversations = () => {
    setOpenAside(!openedAside)
  }

  //
  // listado de contactos
  //

  // Listar más contactos
  const handleLoadMoreContacts = useCallback(() => {
    if (chatStore.loadingChats) {
      console.log("[INTERSECTION OBSERVER] not running is listing rooms");
      return;
    }

    let page = 1;

    if (chatStore.paginationChat) {
      if (chatStore.paginationChat.hasNextPage) {
        page = (chatStore?.paginationChat?.page || 0) + 1;
      } else {
        console.log('No hay más paginas que listar')
        return;
      }
    }
    console.log("Cargar más rooms", { page: page, workspaceId: workspaceSelectionStore.selectedWorkspaceId || '' });
    chatActions.ListChatsAction({ page: page, workspaceId: workspaceSelectionStore.selectedWorkspaceId || '' })
  }, [chatStore.loadingChats, chatStore.paginationChat]);

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
              <h1 className="font-semibold">Inbox</h1>
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
            {currentFilterData && (<span className="font-semibold">{currentFilterData.name || ''}</span>)}
            
          </div>
          {/*  */}

          {/*  */}
          <div className="border-b h-12 w-full flex px-2 justify-between items-center">
            <div>Open(100)</div>
            <div>Newest</div>
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
                  handleLoadMoreContacts={handleLoadMoreContacts}
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
              {(chatStore.listingMessages) && (<ListingMessages />)}
              {!chatStore.listingMessages && (<>
                {chatStore.messages.length == 0 && <InitConversationChat />}
                {chatStore.messages.length > 0 && <MessagesShowcase
                  handleLoadMore={handleLoadMore}
                  topRef={topRef}
                  wrapperListMessagesRef={wrapperListMessagesRef}
                  messages={chatStore.messages || []}
                  loading={false}
                />}
              </>)}
              {/* end:message content */}

              {/* start:footer */}
              <div className="min-h-40 max-h-70 px-2 bottom-0 py-2 ">
                <TextAreaChat sending={chatStore.sendingMessage} resetSignal={resetSignal} HandleToSendMessage={HandleToSendMessage} />
              </div>
              {/* end:footer */}
            </div>
            {/* end:content wrapper */}

            {/*  */}
            <div className="w-65 flex-col min-h-0">
              {/*  */}
              <div className="px-2 pt-2 flex justify-center flex-col items-center gap-2">
                <div className="h-15 w-15 rounded-full bg-gray-100 flex justify-center items-center font-semibold text-gray-500 text-2xl"> {chatStore.contactIndividualOpenedInformation?.fullname.charAt(0)}</div>
                <div>
                  {chatStore.contactIndividualOpenedInformation?.fullname}
                </div>
                <div>
                  <RiWhatsappLine />
                </div>
              </div>
              {/*  */}
              <Separator />
              <div className="px-2 py-2">
                <div className="">
                  <div className="inline-block">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MdOutlineMapsHomeWork />
                      Dirección
                    </div>
                  </div>
                  <div className="inline-block ml-1">{chatStore.contactIndividualOpenedInformation?.mainDirection || '-'}</div>
                </div>
                <div className="">
                  <div className="inline-block">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MdOutlineAlternateEmail />
                      Email
                    </div>
                  </div>
                  <div className="inline-block ml-1">
                    {chatStore.contactIndividualOpenedInformation?.mainEmail || '-'}
                  </div>
                </div>
                <div className="">
                  <div className="inline-block">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MdOutlinePhone />
                      Número celular
                    </div>
                  </div>
                  <div className="inline-block ml-1">
                    {chatStore.contactIndividualOpenedInformation?.mainPhone || '-'}
                  </div>
                </div>
              </div>
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