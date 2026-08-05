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
import { Spinner } from "@/components/ui/spinner"
import { automationStore } from "../store/automationStore"
import { useAutmationActions } from "../actions/useAutomationActions"

type DialogConfirmDelete = {

}

export const DialogConfirmDeleteAutomation = ({ }: DialogConfirmDelete) => {
  const AutomationStore = automationStore();
  const automationActions = useAutmationActions({})

  const HandleToDelete = () => {
    if (!AutomationStore.currentElementSelected) return;
    automationActions.deleteEntityNameAction({ id: AutomationStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={AutomationStore.openDelete} onOpenChange={(open) => { AutomationStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {AutomationStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}