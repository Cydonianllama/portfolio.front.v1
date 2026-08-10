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
import { UseVariablesActions } from "../../actions/useVariablesAction"
import { CreationVariablesSchema, creationVariablesSchema } from "../../schemas/createVariableSchema"
import { useVariableStore } from "../../store/variableStore"

type DialogCreateVariableProps = {}

export const DialogCreateVariable = ({ }: DialogCreateVariableProps) => {
  const appData = useAppData()
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationVariablesSchema>({
    resolver: zodResolver(creationVariablesSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!VariableStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [VariableStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationVariablesSchema) => {
    await useVariablesActions.createVariablesAction({
      name: data.name,
      workspaceId: appData.workspace?.id || '',
    })
  }

  return <>
    <Dialog open={VariableStore.openCreate} onOpenChange={(open) => { VariableStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={VariableStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {VariableStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}