/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { useFieldActions } from "../../actions/useFieldActions";
import { useFieldStore } from "../../store/field.store";
import { DialogContent, DialogHeader, DialogFooter, DialogTitle, Dialog, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type DialogConfirmDelete = {

}

export const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const FieldStore = useFieldStore();
  const fieldActions = useFieldActions({})

  const appData = useAppData()

  const HandleToDelete = () => {
    if (!FieldStore.currentElementSelected) return;
    fieldActions.deleteFieldAction({ id: FieldStore.currentElementSelected || '', workspaceId: appData.workspace?.id || '' })
  }

  return <>
    <Dialog open={FieldStore.openDelete} onOpenChange={(open) => { FieldStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FieldStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {FieldStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}