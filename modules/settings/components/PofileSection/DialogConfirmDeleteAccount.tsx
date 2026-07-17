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
import { useProfileSettings } from "./profileStore"
import { UseUserSettingsHookActions } from "../_hooks/hook.actions.user"
import { UseAppData } from "@/hooks/app/useAppData";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DialogConfirmDeleteAccountProps = {

}

export const DialogConfirmDeleteAccount = ({ }: DialogConfirmDeleteAccountProps) => {
  const useAppData = UseAppData()

  const profileActions = UseUserSettingsHookActions({})

  const profileSettingsStore = useProfileSettings()

  const HandleToCancel = () => {
    profileSettingsStore.setDeleteState({ openDelete: false })
  }

  return <>
    <Dialog open={profileSettingsStore.openDelete} onOpenChange={(open) => profileSettingsStore.setDeleteState({ openDelete: open })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminación de cuenta</DialogTitle>
          <DialogDescription>
            Estás seguro de continuar con la eliminación ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button
            variant={'destructive'}
            disabled={profileSettingsStore.deleting ? true : false}
            onClick={() => {
              profileActions.DeleteUserAction({ userId: useAppData.user?.id || '' })
            }}
          >
            {profileSettingsStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}