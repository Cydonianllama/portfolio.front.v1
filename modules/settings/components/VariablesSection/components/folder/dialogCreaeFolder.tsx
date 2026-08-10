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
import { CreationFolderSchema, creationFolderSchema } from "../../schemas/createFolderSchema"
import { useFolderStore } from "../../store/folder.store"

type DialogCreateFolderProps = {}

export const DialogCreateFolder = ({ }: DialogCreateFolderProps) => {
  const appData = useAppData()
  const FolderStore = useFolderStore();
  const folderActions = useFolderActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationFolderSchema>({
    resolver: zodResolver(creationFolderSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FolderStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [FolderStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationFolderSchema) => {
    await folderActions.createFolderAction({
      name: data.name,
      module: 'variables',
      workspaceId: appData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={FolderStore.openCreate} onOpenChange={(open) => { FolderStore.setCreateState({ openCreate: open }) }} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear item</DialogTitle>
          <DialogDescription>
            Creación de item
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FolderStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {FolderStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}