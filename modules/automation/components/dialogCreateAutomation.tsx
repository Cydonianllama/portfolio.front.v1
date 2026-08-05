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
import { automationStore } from "../store/automationStore"
import { useAutmationActions } from "../actions/useAutomationActions"
import { useEffect } from "react"
import { creationAutomationSchema, CreationAutomationSchema } from "../schemas/createAutomationSchema"

type DialogCreateAutomationProps = {

}

export const DialogCreateAutomation = ({ }: DialogCreateAutomationProps) => {
  const appData = useAppData()

  const AutomationStore = automationStore();
  const automationActions = useAutmationActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationAutomationSchema>({
    resolver: zodResolver(creationAutomationSchema),
  });

  useEffect(() => {
    if (!AutomationStore.openCreate) {
      reset({
        title: '',
      });
    }
  }, [AutomationStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationAutomationSchema) => {
    await automationActions.createEntityNameAction({
      title: data.title,
      workspaceId: appData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={AutomationStore.openCreate} onOpenChange={(open) => { AutomationStore.setCreateState({ openCreate: open }) }} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Automatización</DialogTitle>
          <DialogDescription>
            Creación una nueva automatización
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {AutomationStore.creating && <Spinner data-icon="inline-start" />}
            Crear automatización
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}