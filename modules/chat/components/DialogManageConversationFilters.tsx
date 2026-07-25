/* eslint-disable @typescript-eslint/no-explicit-any */
// components
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"
import { LuSquareDot } from "react-icons/lu"
import { RxDragHandleDots2 } from "react-icons/rx"
import { FiEdit2 } from "react-icons/fi"
import { MdOutlineEdit } from "react-icons/md"
import { BsTrash } from "react-icons/bs"

export interface DialogManageConversationFiltersConfig {
  open: boolean
  setOpen: (open: boolean) => void
  onClickCreate: () => void;
  onClickEdit: (el: ConversationFilterDTO) => void;
  onClickDelete: (el: ConversationFilterDTO) => void;
  conversationsFilter: Array<ConversationFilterDTO>
}

export const DialogManageConversationFilters = (config: DialogManageConversationFiltersConfig) => {

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Filtros de conversaciones</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <div>
            {/* <Separator /> */}
            <div className="flex justify-between py-5">
              <h2 className="font-semibold">Listado de conversaciones</h2>
              <Button onClick={() => { config.onClickCreate() }}>
                Crear
              </Button>
            </div>
          </div>
          <div className="space-y-2 max-h-100 overflow-auto">
            {config.conversationsFilter.map((el, index) => <Item key={index} variant="outline" size="sm" render={<div>
              <ItemMedia>
                <RxDragHandleDots2 />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{el.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button onClick={() => { config.onClickEdit(el) }} variant={'ghost'} size={'icon-xs'} >
                  <MdOutlineEdit />
                </Button>
                <Button onClick={() => { config.onClickDelete(el) }} variant={'ghost'} size={'icon-xs'}>
                  <BsTrash />
                </Button>
              </ItemActions>
            </div>} />)}
          </div>
        </div>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          {/* <Button disabled={config.creating ? true : false} onClick={() => {}}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear convesation filter
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}