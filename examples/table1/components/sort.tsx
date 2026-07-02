/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'

// icons
import { ImSortAmountDesc } from "react-icons/im";

export type SortProps = {
  options: Array<{ id: string, label: string }>;
  onSelect?: (code: string) => void;
}

export const Sort = (data: SortProps) => {
  return (<>
    <Popover>
      <PopoverTrigger
        render={<Button variant={'outline'}>
          <ImSortAmountDesc />
          Ordenar
          (2)
        </Button>}>
      </PopoverTrigger>
      <PopoverContent className={'p-0'}>
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>No encontrado.</CommandEmpty>
            <CommandGroup>
              {data.options.map((el, index) => <CommandItem
                  key={el.id}
                  value={el.label}
                  onSelect={() => {
                    if (data.onSelect) data.onSelect(el.id)
                  }}
                >
                  {el.label}
                </CommandItem>)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </>)
}