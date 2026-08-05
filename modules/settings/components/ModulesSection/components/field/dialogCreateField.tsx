/* eslint-disable @typescript-eslint/no-empty-object-type */
//___________ ___________ Dialog Create
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFieldStore } from "../../store/field.store"
import { useFieldActions } from "../../actions/useFieldActions"
import { useAppData } from "@/hooks/app/useAppData"
import { useEntityStore } from "../../store/entity.store"
import { EntityFieldType } from "@erick/dataengine"
import { useEffect } from "react"
import { TypesFieldSelect, ColorsSelect } from "../../configs"
import { CreationFieldSchema, creationFieldSchema } from "../../schemas/createFieldSchema"

type DialogCreateFieldProps = {

}

export const DialogCreateField = ({ }: DialogCreateFieldProps) => {
  const FieldStore = useFieldStore();
  const fieldActions = useFieldActions({})
  const appData = useAppData()
  const entityStore = useEntityStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<CreationFieldSchema>({
    resolver: zodResolver(creationFieldSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FieldStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [FieldStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationFieldSchema) => {
    await fieldActions.createFieldAction({
      name: data.name,
      workspaceId: appData.workspace?.id || '',
      entityId: entityStore.currentElementSelected || '',
      type: EntityFieldType.string
    })
  }

  const typesFiedSelect = TypesFieldSelect.map(el => ({ label: el.label, value: el.value }))
  const colorsSelector = ColorsSelect.map(el => ({ label: el.color, value: el.value }))

  return <>
    <Dialog open={FieldStore.openCreate} onOpenChange={(open) => { FieldStore.setCreateState({ openCreate: open }) }} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear campo</DialogTitle>
          <DialogDescription>
            Creación de campo
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

          <Field>
            <Label>Tipo</Label>
            <Controller
              control={control}
              name='type'
              render={({ field }) => (
                <Select
                  items={typesFiedSelect}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    {typesFiedSelect.map((el) => (
                      <SelectItem key={el.value} value={el.value}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500">
                {errors.type.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>Color</Label>
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <Select
                  items={colorsSelector}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar color" />
                  </SelectTrigger>

                  <SelectContent>
                    {colorsSelector.map((el) => (
                      <SelectItem key={el.value} value={el.value}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.color && (
              <p className="text-sm text-red-500">
                {errors.color.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FieldStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {FieldStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}