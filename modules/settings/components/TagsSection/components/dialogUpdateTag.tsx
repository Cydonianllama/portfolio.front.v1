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
      name: ""
    }
  });

  useEffect(() => {
    if (!TagStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [TagStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateTagSchema) => {
    if (!currentOpened) return;
    await tagActions.updateTagAction(currentOpened.id, {
      name: data.name,
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