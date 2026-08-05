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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppData } from "@/hooks/app/useAppData"
import { useEffect } from "react"
import { useEntityActions } from "../../actions/useEntityActions"
import { UpdateEntitySchema, updateEntitySchema } from "../../schemas/updateEntitySchema"
import { useEntityStore } from "../../store/entity.store"
import { FieldSection } from "../field/fieldScreen"
import { IconSelector } from "./IconSelector"

type DialogUpdateEntityProps = {

}

export const DialogUpdateEntity = ({ }: DialogUpdateEntityProps) => {
  const EntityStore = useEntityStore();
  const entityActions = useEntityActions({})
  const appData = useAppData()
  const currentOpened = EntityStore.list.find(el => EntityStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateEntitySchema>({
    resolver: zodResolver(updateEntitySchema),
    defaultValues: {
      name: "",
      codeIcon: "",
    }
  });

  useEffect(() => {
    if (!EntityStore.openUpdate) {
      reset({
        name: '',
        codeIcon: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
        codeIcon: currentOpened.codeIcon || '',
      })
    }


  }, [EntityStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateEntitySchema) => {
    if (!currentOpened) return;
    await entityActions.updateEntityAction(currentOpened.id, {
      name: data.name,
      codeIcon: data.codeIcon || '',
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={EntityStore.openUpdate} onOpenChange={(open) => { EntityStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-lg">
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
          <Field>
            <Label>Icono</Label>
            <IconSelector
              value={watch('codeIcon') || ''}
              onChange={(code) => setValue('codeIcon', code, { shouldValidate: true })}
            />
          </Field>
        </FieldGroup>
        <hr />
        <FieldSection />
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={EntityStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {EntityStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}