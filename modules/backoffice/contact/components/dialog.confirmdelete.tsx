// components
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
import { Spinner } from "@/components/ui/spinner"

export interface DialogConfirmDeleteConfig {
  onDelete: () => void
  open: boolean
  setOpen: (open: boolean) => void
  deleting: boolean
}

export const DialogConfirmDelete = (config: DialogConfirmDeleteConfig) => {

  const HandleToDelete = () => {
    config.onDelete()
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Se realizará la eliminación de <strong>forma definitiva</strong>, deséa continuar ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.deleting ? true : false} onClick={HandleToDelete} variant={'destructive'} type="button">
            {config.deleting && <Spinner data-icon="inline-start" />}
            Continuar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}