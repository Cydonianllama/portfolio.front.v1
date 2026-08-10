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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppData } from "@/hooks/app/useAppData"
import { useTagActions } from "../actions/useTagActions"
import { useTagStore } from "../store/tagStore"

type DialogConfirmDelete = {

}

export function DialogConfirmDelete({ }: DialogConfirmDelete) {
  const appData = useAppData()
  const TagStore = useTagStore();
  const tagActions = useTagActions({})

  const HandleToDelete = () => {
    if (!TagStore.currentElementSelected) return;
    tagActions.deleteTagAction({ id: TagStore.currentElementSelected || '', workspaceId: appData.workspace?.id || '' })
  }

  return <>
    <Dialog open={TagStore.openDelete} onOpenChange={(open) => { TagStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={TagStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {TagStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

