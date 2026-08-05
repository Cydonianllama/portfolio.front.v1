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
import { automationStore } from "../store/automationStore"
import { useAutmationActions } from "../actions/useAutomationActions"
import { useEffect } from "react"
import { UpdateAutomationSchema, updateAutomationSchema } from "../schemas/updateAutomationSchema"

type DialogUpdateAutomationProps = {

}

export const DialogUpdateAutomation = ({ }: DialogUpdateAutomationProps) => {
  const AutomationStore = automationStore();
  const automationActions = useAutmationActions({})

  const currentOpened = AutomationStore.list.find(el => AutomationStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateAutomationSchema>({
    resolver: zodResolver(updateAutomationSchema),
  });

  useEffect(() => {
    if (!AutomationStore.openUpdate) {
      reset({
        title: '',
      });
    }

    if (currentOpened) {
      reset({
        title: currentOpened.title || '',
      })
    }


  }, [AutomationStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateAutomationSchema) => {
    if (!currentOpened) return;
    await automationActions.updateEntityNameAction(currentOpened.id, {
      title: data.title,
      id: currentOpened.id || ''
    })
  }
  return <>
    <Dialog open={AutomationStore.openUpdate} onOpenChange={(open) => { AutomationStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar automatización</DialogTitle>
          <DialogDescription>
            Actualización de automatización.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Nombre</Label>
            <Input
              placeholder="name"
              {...register("title")}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {AutomationStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar automatización
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}