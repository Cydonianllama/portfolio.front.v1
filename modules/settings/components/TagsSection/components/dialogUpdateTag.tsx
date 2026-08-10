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
import { UpdateTagSchema, updateTagSchema } from "../schemas/updateTagSchema"
import { useTagStore } from "../store/tagStore"
import { ColorsSelector } from "./List"

type DialogUpdateTagProps = {

}

export function DialogUpdateTag({ }: DialogUpdateTagProps){
  const appData = useAppData()
  const TagStore = useTagStore();
  const tagActions = useTagActions({})

  const currentOpened = TagStore.list.find(el => TagStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateTagSchema>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: "",
      color: "color::default",
    }
  });

  useEffect(() => {
    if (!TagStore.openUpdate) {
      reset({
        name: '',
        color: 'color::default',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
        color: currentOpened.color || 'color::default',
      })
    }


  }, [TagStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateTagSchema) => {
    if (!currentOpened) return;
    await tagActions.updateTagAction(currentOpened.id, {
      name: data.name,
      color: data.color,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={TagStore.openUpdate} onOpenChange={(open) => { TagStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={TagStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {TagStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}