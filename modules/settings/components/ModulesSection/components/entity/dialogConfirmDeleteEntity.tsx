/* eslint-disable @typescript-eslint/no-empty-object-type */
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
import { useEntityActions } from "../../actions/useEntityActions"
import { useEntityStore } from "../../store/entity.store"

type DialogConfirmDelete = {

}

export const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const EntityStore = useEntityStore();
  const entityActions = useEntityActions({})
  const appData = useAppData()
  const HandleToDelete = () => {
    if (!EntityStore.currentElementSelected) return;
    entityActions.deleteEntityAction({ id: EntityStore.currentElementSelected || '', workspaceId: appData.workspace?.id || '' })
  }

  return <>
    <Dialog open={EntityStore.openDelete} onOpenChange={(open) => { EntityStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={EntityStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {EntityStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}