/* eslint-disable @typescript-eslint/no-explicit-any */

// DropdownName
// Item_Name_DTO

// _____________ DROPDOWN

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"

type DropdownNameProps = {
  onSearch: (text: string) => void
  items: Item_Name_DTO[]
  searching: boolean
  value?: Item_Name_DTO | null
  onSelect?: (user: Item_Name_DTO) => void
  className?: string
}

export const DropdownName = ({
  items,
  onSearch,
  searching,
  value,
  onSelect,
  ...props
}: DropdownNameProps) => {

  const texts = {
    NotElementSelected: 'Seleccionar usuario',
    Searching: 'Buscando...',
    ItemsNotFound: 'No se encontraron Usuarios'
  }

  const getInitials = (name: string)  => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join("")
  }

  return (
    <div {...props}>
      <Combobox
        items={items}
        value={value}
        onValueChange={(item) => {
          if (onSelect && item) onSelect(item)
        }}
        itemToStringValue={(item: Item_Name_DTO) => item.title}
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
            {(item: Item_Name_DTO | null) =>
              item ? (
                <span className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      src={item.url}
                      alt={item.title}
                    />
                    <AvatarFallback>
                      {getInitials(item.title)}
                    </AvatarFallback>
                  </Avatar>

                  <span>{item.title}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {texts.NotElementSelected}
                </span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput
            showTrigger={false}
            placeholder={texts.NotElementSelected}
            onChange={(text) => {
              if (onSearch) onSearch(text.target.value)
            }}
          />

          {searching && (
            <div className="px-2 py-3 text-sm text-muted-foreground">
              {texts.Searching}
            </div>
          )}

          {!searching && (
            <>
              <ComboboxEmpty>{texts.ItemsNotFound}</ComboboxEmpty>

              <ComboboxList>
                {(item: Item_Name_DTO) => (
                  <ComboboxItem
                    key={item.id}
                    value={item}
                  >
                    <Item size="xs" className="p-0">
                      <Avatar className="size-6">
                        <AvatarImage
                          src={item.url}
                          alt={item.title}
                        />
                        <AvatarFallback>
                          {getInitials(item.title)}
                        </AvatarFallback>
                      </Avatar>

                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">
                          {item.title}
                        </ItemTitle>

                        <ItemDescription>
                          {item.info}
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

// ______________ DTOS

interface Item_Name_DTO {
  id: string;
  title: string
  info: string;
  url: string
}