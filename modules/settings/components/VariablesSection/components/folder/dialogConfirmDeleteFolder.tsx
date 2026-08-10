import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useFolderActions } from "../../actions/useFolderActions"
import { useFolderStore } from "../../store/folder.store"

type DialogConfirmDelete = {}

export const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const FolderStore = useFolderStore();
  const folderActions = useFolderActions({})

  const HandleToDelete = () => {
    if (!FolderStore.currentElementSelected) return;
    folderActions.deleteFolderAction({ id: FolderStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={FolderStore.openDelete} onOpenChange={(open) => { FolderStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FolderStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {FolderStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}