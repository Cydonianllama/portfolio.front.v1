/* eslint-disable @typescript-eslint/no-empty-object-type */
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
import { FormConfirmDeleteWorkspace } from "./FormDeleteWorkspace"
import { useGeneralWorkspaceSection } from "./store"

type DialogDeleteWorkspaceProps = {

}

export const DialogDeleteWorkspace= ({  } : DialogDeleteWorkspaceProps) => {
  const generalWorkspaceStore = useGeneralWorkspaceSection()
  return <>
    <Dialog open={generalWorkspaceStore.openDelete} onOpenChange={(open) => generalWorkspaceStore.setDeleteState({ openDelete: open })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle >Eliminar workspace</DialogTitle>
          <DialogDescription >
            Escribe <strong className={'text-red-600'} >DELETE</strong> para continuar con la eliminación.
          </DialogDescription>
        </DialogHeader>
        <FormConfirmDeleteWorkspace />
      </DialogContent>
    </Dialog>
  </>
}