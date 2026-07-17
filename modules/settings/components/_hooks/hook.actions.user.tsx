import { DeleteUser, DeleteUserRequestDTO } from "@/api/user"
import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UserSettingsHookActionsProps = {

}

export const UseUserSettingsHookActions = ({} : UserSettingsHookActionsProps) => {

  const DeleteUserAction = useCallback(async (data: DeleteUserRequestDTO) => {
    try {
      const req = await DeleteUser(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('usuario eliminado correctamente')

      //TODO: eliminar localstorage y redirigir a la landing
  
    } catch (ex) {
  
    } finally {
  
    }
  }, [])

  return {
    DeleteUserAction
  }
}