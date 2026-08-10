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
import { useMembersStore } from "../store/membersStore"
import { useMembersActions } from "../actions/useMembersActions"

type DialogConfirmDelete = {}

export const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const MembersStore = useMembersStore();
  const membersActions = useMembersActions({})

  const HandleToDelete = () => {
    if (!MembersStore.currentElementSelected) return;
    membersActions.deleteMembersAction({ id: MembersStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={MembersStore.openDelete} onOpenChange={(open) => { MembersStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {MembersStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
