/* eslint-disable @typescript-eslint/no-explicit-any */
// components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { FiInbox } from "react-icons/fi"
import { MdOutlineEdit } from "react-icons/md"
import { BsTrash } from "react-icons/bs"
import { GoPlus } from "react-icons/go"

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
          <DialogDescription>
            Administra los filtros que organizan tus conversaciones.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between py-2">
          <h2 className="font-semibold text-foreground text-sm">Listado de conversaciones</h2>
          <Button onClick={() => { config.onClickCreate() }} size={'sm'}>
            <GoPlus />
            Crear
          </Button>
        </div>

        <div className="space-y-2 max-h-100 overflow-auto">
          {config.conversationsFilter.length > 0 ? (
            config.conversationsFilter.map((el, index) => <Item key={el.id || index} variant="outline" size="sm" render={<div>
              <ItemContent>
                <ItemTitle className="flex items-center gap-2">
                  {el.icon ? <span className="text-base">{el.icon}</span> : <FiInbox className="text-gray-400" />}
                  {el.name}
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button onClick={() => { config.onClickEdit(el) }} variant={'ghost'} size={'icon-xs'} title="Editar">
                  <MdOutlineEdit />
                </Button>
                <Button onClick={() => { config.onClickDelete(el) }} variant={'ghost'} size={'icon-xs'} title="Eliminar">
                  <BsTrash />
                </Button>
              </ItemActions>
            </div>} />)
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 border border-dashed rounded-lg py-10 text-center">
              <FiInbox className="text-gray-300 text-3xl" />
              <p className="text-sm font-medium text-muted-foreground">No hay filtros creados</p>
              <p className="text-xs text-muted-foreground">Crea tu primer filtro para organizar las conversaciones.</p>
              <Button onClick={() => { config.onClickCreate() }} size={'sm'} variant={'outline'} className="mt-1">
                <GoPlus />
                Crear filtro
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}
