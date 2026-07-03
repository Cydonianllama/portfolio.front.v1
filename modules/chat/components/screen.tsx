/* eslint-disable @next/next/no-img-element */
'use client'

import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import TextareaAutosize from "react-textarea-autosize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { RiWhatsappLine } from "react-icons/ri";
import { ContactCard, ContactCardData } from "./contact.card";
import { ChatMessage } from "./chat.message";

const contacts: ContactCardData[] = [
  {
    id: 'asd',
    name: "Erick Manuel Grandez Mendoza",
    thumb: "https://i.pinimg.com/280x280_RS/26/0d/4c/260d4ced291880ab0a6b44f7af481001.jpg",
    lastMessage: "Mamahuebo",
    time: "3:45",
  },
]

export const ChatScreen = () => {
  return (<>
    <div className="w-full border-t h-full max-h-full flex flex-col">
      <div className="h-full flex ">
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
          <div>

          </div>
          {/*  */}

        </div>
        {/* end:aside */}

        {/* start-leftsidechat  */}
        <div className="w-70 h-full ">
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
          <div className="flex w-full max-w-md flex-col gap-6 px-2 py-2">
            <ItemGroup className="gap-2">
              {contacts.map((item, index) => (
                <ContactCard data={item} key={index} />
              ))}
            </ItemGroup>
          </div>
          {/*  */}
        </div>
        {/* end:leftside-chat */}

        {/* start:content wrapper */}
        <div className="border-r border-l flex-1 h-full max-h-full flex flex-col ">
          {/* start::Header content  */}
          <div className="h-15 w-full border-b items-center justify-between flex px-2">
            <div>
              <h1 className="font-semibold">Nombre de contacto</h1>
            </div>
            <div>
              actions
            </div>
          </div>
          {/* end:Header content */}


          {/* start:message content */}
          <div className="flex-1 flex flex-col overflow-auto gap-2">

            <ChatMessage type="me" />
            <ChatMessage type="me" />
            <ChatMessage type="me" />

            <ChatMessage type="others" />

            <ChatMessage type="me" />

            <ChatMessage type="others" />
            <ChatMessage type="others" />

          </div>
          {/* end:message content */}

          {/* start:footer */}
          <div className="h-40 flex-col px-2">
            <InputGroup>
              <TextareaAutosize
                data-slot="input-group-control"
                className="flex field-sizing-content min-h-25 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                placeholder="Escribe el mensaje..."
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton className="ml-auto" size="sm" variant="default">
                  Submit
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          {/* end:footer */}
        </div>
        {/* end:content wrapper */}

        {/*  */}
        <div className="w-65 h-full flex-col">
          {/*  */}
          <div className="px-2 pt-2 flex justify-center flex-col items-center gap-2">
            <div className="h-15 w-15 rounded-full bg-red-500 flex justify-center items-center font-semibold text-white"> EG</div>
            <div>
              Erick Manuel Grandez Mendoza
            </div>
            <div>
              <RiWhatsappLine />
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
      </div>
    </div>
  </>)
}