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

export interface DialogManageConversationFiltersConfig {
  open: boolean
  setOpen: (open: boolean) => void
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
            Creación de filtro de conversaciones.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Separator />
          <div className="flex justify-between py-5">
            <h2 className="font-semibold">Listado de conversaciones</h2>
            <Button>
              Crear
            </Button>
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