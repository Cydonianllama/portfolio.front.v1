/* eslint-disable @typescript-eslint/no-empty-object-type */

//___________ ___________ Dialog Update
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
import { useFieldActions } from "../../actions/useFieldActions"
import { UpdateFieldSchema, updateFieldSchema } from "../../schemas/updateFieldSchema"
import { useFieldStore } from "../../store/field.store"

type DialogUpdateFieldProps = {

}

export const DialogUpdateField = ({ }: DialogUpdateFieldProps) => {
  const FieldStore = useFieldStore();
  const fieldActions = useFieldActions({})
  const appData = useAppData()
  const currentOpened = FieldStore.list.find(el => FieldStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateFieldSchema>({
    resolver: zodResolver(updateFieldSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FieldStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [FieldStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateFieldSchema) => {
    if (!currentOpened) return;
    await fieldActions.updateFieldAction(currentOpened.id, {
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={FieldStore.openUpdate} onOpenChange={(open) => { FieldStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar campo</DialogTitle>
          <DialogDescription>
            Actualización de campo
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
          <Button disabled={FieldStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {FieldStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
