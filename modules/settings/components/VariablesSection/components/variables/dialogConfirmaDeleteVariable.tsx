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
import { UseVariablesActions } from "../../actions/useVariablesAction"
import { useVariableStore } from "../../store/variableStore"

type DialogConfirmDelete = {}

export const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const HandleToDelete = () => {
    if (!VariableStore.currentElementSelected) return;
    useVariablesActions.deleteVariablesAction({ id: VariableStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={VariableStore.openDelete} onOpenChange={(open) => { VariableStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={VariableStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {VariableStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
