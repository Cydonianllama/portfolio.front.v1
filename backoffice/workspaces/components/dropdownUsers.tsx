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
import { UserSelectionDTO } from "../models/dto"
import { useState } from "react"

type DropdownUserProps = {
  onSearch: (text: string) => void
  items: UserSelectionDTO[]
  searching: boolean
  value?: UserSelectionDTO | null
  onSelect?: (user: UserSelectionDTO) => void
  className?: string
}

export const DropdownUser = ({
  items,
  onSearch,
  searching,
  value,
  onSelect,
  ...props
}: DropdownUserProps) => {

  const getInitials = (name: string)  => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join("")
  }

  const [idQueryTimeout, setIdQueryTimeout] = useState<any>('')

  return (
    <div {...props}>
      <Combobox
        items={items}
        value={value}
        onValueChange={(item) => {
          if (onSelect && item) onSelect(item)
        }}
        itemToStringValue={(member: UserSelectionDTO) => member.name}
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
            {(member: UserSelectionDTO | null) =>
              member ? (
                <span className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      src={member.profileURL}
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
                  Seleccionar usuario
                </span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput
            showTrigger={false}
            placeholder="Buscar usuario..."
            onChange={(text) => {
              clearTimeout(idQueryTimeout)
              const newId = setTimeout(() => {
                if (onSearch) onSearch(text.target.value)
              }, 600)
              setIdQueryTimeout(newId)
            }}
          />

          {searching && (
            <div className="px-2 py-3 text-sm text-muted-foreground">
              Buscando...
            </div>
          )}

          {!searching && (
            <>
              <ComboboxEmpty>No se encontraron usuarios.</ComboboxEmpty>

              <ComboboxList>
                {(member: UserSelectionDTO) => (
                  <ComboboxItem
                    key={member.id}
                    value={member}
                  >
                    <Item size="xs" className="p-0">
                      <Avatar className="size-6">
                        <AvatarImage
                          src={member.profileURL}
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

                        <ItemDescription>
                          {member.role}
                        </ItemDescription>
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