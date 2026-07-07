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
import { ContactCard, ContactCardData } from "./contact.card";
import { ChatMessage } from "./chat.message";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { UseChatActions } from "../../../hooks/useChatActions";
import { useChatStore } from "../store/store.chat";
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { HandleToSendMessageProp, TextAreaChat } from "./TextAreaChat";
import { MessagesShowcase } from "./MessagesShowcase";
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaRegUser } from "react-icons/fa";
import { ListConversationPagesSection } from "./states/ListConversationPages";
import { EmptySectionListContacts } from "./states/EmptySectionListContat";
import { ListingSectionListContacts } from "./states/ListingSectionListContacts";
import { NotRoomOpenedState } from "./states/NotRoomOpenedState";
import { InitConversationChat } from "./states/InitConversationChat";
import { ListingMessages } from "./states/ListingMessages";

export const ChatScreen = () => {
  const chatStore = useChatStore()
  const chatActions = UseChatActions()
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const [resetSignal, setResetSignal] = useState(0);

  const handleResetAll = () => {
    // limpiar textarea
    handleResetTextarea()

    // limpiar mensajes y estado de room opened
    chatStore.setChatSelectedStates({ messages: [], roomIdOpened: null })

    // limpiar informacion de contacto
    chatStore.setIndividualContact({ contactIndividualOpenedInformation: null })
  }

  const handleResetTextarea = () => {
    setResetSignal((prev) => prev + 1);
  };

  //
  // INIT
  //

  useEffect(() => {
    if (workspaceSelectionStore.selectedWorkspaceId) {
      const page = 1;
      chatActions.ListChatsAction({ page, workspaceId: workspaceSelectionStore.selectedWorkspaceId || '' })
    }
  }, [workspaceSelectionStore.selectedWorkspaceId])

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
  //
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

  return (<>
    <div className="w-full border-t  h-full flex flex-col">
      <div className="flex h-full">
        {/* start:aside */}
        <div className="w-65 h-full border-r">

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
          <ListConversationPagesSection />
          {/*  */}

        </div>
        {/* end:aside */}

        {/* start-leftsidechat  */}
        <div className="w-70 flex flex-col h-full min-h-0 border-r">
          {/*  */}
          <div className="border-b h-15 px-2 flex items-center gap-2">
            <Button variant={'ghost'} size={'icon'}>
              <RxHamburgerMenu />
            </Button>
            <span className="font-semibold">All</span>
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
            {chatStore.loadingChats && (<ListingSectionListContacts />)}
            {!chatStore.loadingChats && (<>
              {(chatStore.listChats.length == 0) && (<EmptySectionListContacts />)}
              {(chatStore.listChats.length > 0) && (
                <ScrollArea className="h-full px-2 py-2">
                  <ItemGroup className="h-full">
                    {chatStore.listChats.map((item, index) => (
                      <ContactCard
                        handleOpenChat={HandleOpenChat}
                        data={{
                          id: item.id,
                          lastMessage: item.lastMessage || 'No registramos mensajes',
                          name: item.name,
                          thumb: '',
                          time: '-'
                        }}
                        key={index}
                      />
                    ))}
                  </ItemGroup>
                </ScrollArea>
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
              {chatStore.listingMessages && (<ListingMessages />)}

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
            </div>
            {/*  */}
          </div>
        </>)}


        {/*  */}

      </div>
    </div>
  </>)
}