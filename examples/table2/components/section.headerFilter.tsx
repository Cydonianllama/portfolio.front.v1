// componets
import { InputSearchTable } from "@/components/InputSearchTable"
import { Button } from "@/components/ui/button"

import { HiDotsHorizontal } from "react-icons/hi";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
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
import { DatePicker } from "./date.picker"
import { configurationModule, tabsAvailables } from "../config";

import { MdHelpOutline } from "react-icons/md";

export type SectionHeaderFilterProps = {
  OnSearch: (text: string) => void
  itemsSelected?: Array<string>
  onChangeTabSelection?: (code: tabsAvailables) => void;
  currentTab?: tabsAvailables,
  defaultTab?: tabsAvailables
}

export const SectionHeaderFilter = (data: SectionHeaderFilterProps) => {
  return (<>

    <div className="flex justify-between items-center pb-5">
      <div className="flex gap-2 items-center">
        <Tabs
          value={data.currentTab || ''}
          onValueChange={(val) => {
            if (data.onChangeTabSelection) data.onChangeTabSelection(val)
          }}
          defaultValue={data.currentTab || ''}
        >
          <TabsList>
            {configurationModule.tabs.map((code, index) => (
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
        <DatePicker />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size={'icon'}><HiDotsHorizontal /></Button>} />
          <DropdownMenuContent className={'max-w-lg w-50'}>
            {/*  */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Parametros
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          Visible columns
                        </DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          // checked={notifications.push}
                          onCheckedChange={(checked) => { }}
                        >
                          Id
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={notifications.email}
                          onCheckedChange={(checked) => { }}
                        >
                          Name
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={notifications.email}
                          onCheckedChange={(checked) => { }}
                        >
                          Description
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          // checked={notifications.email}
                          onCheckedChange={(checked) => { }}
                        >
                          Estatus
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/*  */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {

              }}>
                <MdHelpOutline />
                Help
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {((data?.itemsSelected?.length || 0) > 0) && (<>
          <span>{data?.itemsSelected?.length}</span> elementos seleccionados.
        </>)}
      </div>
    </div>
  </>)
}