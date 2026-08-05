/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DialogContent, DialogHeader, DialogFooter, Dialog, DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAppData } from "@/hooks/app/useAppData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "recharts";
import { useEntityActions } from "../../actions/useEntityActions";
import { CreationEntitySchema, creationEntitySchema } from "../../schemas/createEntitySchema";
import { useEntityStore } from "../../store/entity.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DialogCreateEntityProps = {

}

export const DialogCreateEntity = ({ }: DialogCreateEntityProps) => {
  const EntityStore = useEntityStore();
  const entityActions = useEntityActions({})
  const appData = useAppData()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationEntitySchema>({
    resolver: zodResolver(creationEntitySchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!EntityStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [EntityStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationEntitySchema) => {
    await entityActions.createEntityAction({
      name: data.name,
      workspaceId: appData.workspace?.id || '',
      fields: []
    })
  }

  return <>
    <Dialog open={EntityStore.openCreate} onOpenChange={(open) => { EntityStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={EntityStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {EntityStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}