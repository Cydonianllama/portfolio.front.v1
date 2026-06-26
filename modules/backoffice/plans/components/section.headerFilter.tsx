// componets
import { InputSearchTable } from "@/components/InputSearchTable"
import { Button } from "@/components/ui/button"

import { HiDotsHorizontal } from "react-icons/hi";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
import { IoMdRefresh } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { configurationModule, filtertabsAvailables } from "../config";

import { MdHelpOutline } from "react-icons/md";

export type SectionHeaderFilterProps = {
  OnSearch: (text: string) => void
  itemsSelected?: Array<string>
  onChangeTabSelection?: (code: filtertabsAvailables) => void;
  currentTab?: filtertabsAvailables,
  defaultTab?: filtertabsAvailables,
  HandleToOpenAddItem: () => void
  HandleToRefresh: () => void
}

export const SectionHeaderFilter = (data: SectionHeaderFilterProps) => {
  return (<>

    <div className="flex justify-between items-center pb-2">
      <div className="flex gap-2 items-center">
        <Tabs
          value={data.currentTab || ''}
          onValueChange={(val) => {
            if (data.onChangeTabSelection) data.onChangeTabSelection(val)
          }}
          defaultValue={data.currentTab || ''}
        >
          <TabsList>
            {configurationModule.filterTabs.map((code, index) => (
              <TabsTrigger key={index} value={code}>{code}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <InputSearchTable
          onSearch={data.OnSearch}
          placeholder="Buscar"
          timeout={600}
        />
        {((data?.itemsSelected?.length || 0) > 0) && (<>
          <span>{data?.itemsSelected?.length}</span> elementos seleccionados.
        </>)}
        <Button variant={'outline'} onClick={data.HandleToRefresh} size={'icon'} >
          <IoMdRefresh/>
        </Button>
        <Button onClick={data.HandleToOpenAddItem}>Agregar plan</Button>
      </div>
    </div>
  </>)
}