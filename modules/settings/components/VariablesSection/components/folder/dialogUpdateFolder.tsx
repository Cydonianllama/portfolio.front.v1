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
import { useEffect } from "react"
import { useFolderActions } from "../../actions/useFolderActions"
import { UpdateFolderSchema, updateFolderSchema } from "../../schemas/updateFolderSchema"
import { useFolderStore } from "../../store/folder.store"

type DialogUpdateFolderProps = {}

export const DialogUpdateFolder = ({ }: DialogUpdateFolderProps) => {
  const appData = useAppData()
  const FolderStore = useFolderStore();
  const folderActions = useFolderActions({})

  const currentOpened = FolderStore.list.find(el => FolderStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateFolderSchema>({
    resolver: zodResolver(updateFolderSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FolderStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [FolderStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateFolderSchema) => {
    if (!currentOpened) return;
    await folderActions.updateFolderAction(currentOpened.id, {
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={FolderStore.openUpdate} onOpenChange={(open) => { FolderStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar item</DialogTitle>
          <DialogDescription>
            Actualización de item
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Nombre</Label>
            <Input
              placeholder="name"
              {...register("name")}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FolderStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {FolderStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}