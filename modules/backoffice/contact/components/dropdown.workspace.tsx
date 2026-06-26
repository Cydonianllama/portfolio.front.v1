"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Field } from "@/components/ui/field"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"


import { useState } from "react"
import { WorkspaceSelectionDTO } from "../models/dto"

type DropdownUserProps = {
  onSearch: (text: string) => void
  items: WorkspaceSelectionDTO[]
  searching: boolean
  value?: WorkspaceSelectionDTO | null
  onSelect?: (user: WorkspaceSelectionDTO) => void
  className?: string;
}

export const DropdownWorkspace = ({
  items,
  onSearch,
  searching,
  value,
  onSelect,
  ...props
}: DropdownUserProps) => {

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join("")
  }

  const [idTimeout, setIdTimeout] = useState<any>('')

  return (
    <div {...props}>
      <Combobox
        items={items}
        value={value}
        onValueChange={(item) => {
          clearTimeout(idTimeout)
          const newId = setTimeout(() => {
            if (onSelect && item) onSelect(item)
          }, 600);
          setIdTimeout(newId)
        }}
        itemToStringValue={(member: WorkspaceSelectionDTO) => member.name}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          <ComboboxValue>
            {(member: WorkspaceSelectionDTO | null) =>
              member ? (
                <span className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      src={member.logoURL}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  <span>{member.name}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Seleccionar workspaces
                </span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput
            showTrigger={false}
            placeholder="Buscar workspace..."
            onChange={(text) => {
              if (onSearch) onSearch(text.target.value)
            }}
          />

          {searching && (
            <div className="px-2 py-3 text-sm text-muted-foreground">
              Buscando...
            </div>
          )}

          {!searching && (
            <>
              <ComboboxEmpty>No se encontraron workspaces.</ComboboxEmpty>

              <ComboboxList>
                {(member: WorkspaceSelectionDTO) => (
                  <ComboboxItem
                    key={member.id}
                    value={member}
                  >
                    <Item size="xs" className="p-0">
                      <Avatar className="size-6">
                        <AvatarImage
                          src={member.logoURL}
                          alt={member.name}
                        />
                        <AvatarFallback>
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>

                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">
                          {member.name}
                        </ItemTitle>

                        {/* <ItemDescription>
                          {member.role}
                        </ItemDescription> */}
                      </ItemContent>
                    </Item>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </>
          )}
        </ComboboxContent>
      </Combobox>
    </div>
  )
}