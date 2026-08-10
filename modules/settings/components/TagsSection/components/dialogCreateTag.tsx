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
import { useTagActions } from "../actions/useTagActions"
import { CreationTagSchema, creationTagSchema } from "../schemas/createTagSchema"
import { useTagStore } from "../store/tagStore"
import { ColorsSelector } from "./List"

type DialogCreateTagProps = {}

export function DialogCreateTag({ }: DialogCreateTagProps) {
  const TagStore = useTagStore();
  const tagActions = useTagActions({})

  const appData = useAppData()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationTagSchema>({
    resolver: zodResolver(creationTagSchema),
    defaultValues: {
      name: "",
      color: "color::default",
    }
  });

  useEffect(() => {
    if (!TagStore.openCreate) {
      reset({
        name: '',
        color: 'color::default',
      });
    }
  }, [TagStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationTagSchema) => {
    await tagActions.createTagAction({
      name: data.name,
      color: data.color,
      workspaceId: appData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={TagStore.openCreate} onOpenChange={(open) => { TagStore.setCreateState({ openCreate: open }) }} >
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
          <Field>
            <Label>Color</Label>
            <div className="flex gap-2 mt-1">
              {ColorsSelector.map((colorItem) => (
                <button
                  key={colorItem.code}
                  type="button"
                  onClick={() => setValue("color", colorItem.code)}
                  className={`h-6 w-6 rounded-full cursor-pointer border-2 ${watch("color") === colorItem.code ? 'border-foreground ring-2 ring-offset-1 ring-gray-300' : 'border-transparent'} ${colorItem.classname}`}
                  title={colorItem.name}
                />
              ))}
            </div>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={TagStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {TagStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
