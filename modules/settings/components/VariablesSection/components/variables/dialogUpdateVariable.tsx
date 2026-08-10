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
import { UpdateVariablesSchema, updateVariablesSchema } from "../../schemas/updateVariableSchema"
import { useVariableStore } from "../../store/variableStore"

type DialogUpdateVariableProps = {}

export const DialogUpdateVariable = ({ }: DialogUpdateVariableProps) => {
  const appData = useAppData()
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const currentOpened = VariableStore.list.find(el => VariableStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateVariablesSchema>({
    resolver: zodResolver(updateVariablesSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!VariableStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [VariableStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateVariablesSchema) => {
    if (!currentOpened) return;
    await useVariablesActions.updateVariablesAction(currentOpened.id, {
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={VariableStore.openUpdate} onOpenChange={(open) => { VariableStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={VariableStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {VariableStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
