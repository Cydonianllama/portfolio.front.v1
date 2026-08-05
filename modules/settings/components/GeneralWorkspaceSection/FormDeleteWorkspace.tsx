import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppData } from "@/hooks/app/useAppData";
import { DeleteWorkspace } from "@/api/workspace/workspace.api"
import { toast } from "sonner"
import { useGeneralWorkspaceSection } from "./store"
import { DialogFooter } from "@/components/ui/dialog"
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"

// actionName
// HandleToProcess

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FormConfirmDeleteWorkspaceProps = {

}

export const FormConfirmDeleteWorkspace = ({ }: FormConfirmDeleteWorkspaceProps) => {
  const appData = useAppData()
  const settingsStore = useSettingsStore()
  const generalWorkspaceStore = useGeneralWorkspaceSection()
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequestdeleteWorkspaceSchema>({
    resolver: zodResolver(deleteWorkspaceSchema),
    defaultValues: {
      text: ''
    }
  });

  const HandleToProcess = async (data: RequestdeleteWorkspaceSchema) => {
    try {
      if (data.text != 'DELETE') {
        toast.warning('Escribe la palabra "DELETE" para continuar el proceso');
        return;
      }

      generalWorkspaceStore.setDeleteState({ deleting: true })

      const req = await DeleteWorkspace({
        workspaceId: appData.workspace?.id || ''
      })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      //TODO: refactorizacion de esta webada
      let workspaces = [...workspaceSelectionStore.workspaces]
      if (workspaces){
        workspaces = workspaces.filter(el => el.id != appData.workspace?.id)
        if (workspaces.length > 0){
          workspaceSelectionStore.setSelectedWorkspaceId(workspaces[0].id)
        } else {
          workspaceSelectionStore.setSelectedWorkspaceId(null)
        }
        workspaceSelectionStore.setWorkspaces(workspaces)
      }
      
      settingsStore.setOpen(false)

      toast.success('Preparando para la eliminación, puede continuar');
    } catch (ex) {
      toast.error('Error inesperado, por favor intentarlo más tarde.')
    } finally {
      generalWorkspaceStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }

  return <>
    <FieldGroup>
      <Field>
        <Label>Nombre</Label>
        <Input
          placeholder="Nombre"
          {...register("text")}
        />
        {errors.text && (
          <p className="text-sm text-red-500">
            {errors.text.message}
          </p>
        )}
      </Field>
    </FieldGroup>

    <DialogFooter>
      <Button variant={'outline'} onClick={() => { generalWorkspaceStore.setDeleteState({ openDelete: false }) }}>Cancelar</Button>
      <Button variant={'destructive'} disabled={generalWorkspaceStore.deleting ? true : false} onClick={handleSubmit(HandleToProcess)} >
        {generalWorkspaceStore.deleting && <Spinner data-icon="inline-start" />}
        Eliminar workspace
      </Button>
    </DialogFooter>


  </>
}

import { z } from "zod/v3";
import { useSettingsStore } from "../../store/settingsStore"

export const deleteWorkspaceSchema = z.object({
  text: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
});

export type RequestdeleteWorkspaceSchema = z.infer<typeof deleteWorkspaceSchema>;