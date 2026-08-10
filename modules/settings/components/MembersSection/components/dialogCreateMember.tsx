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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DEFAULT_ROLES } from "@/api/members/members"
import { useAppData } from "@/hooks/app/useAppData"
import { useEffect } from "react"
import { useMembersActions } from "../actions/useMembersActions"
import { CreationMembersSchema, creationMembersSchema } from "../schemas/createMemberSchema"
import { useMembersStore } from "../store/membersStore"

type DialogCreateMembersProps = {

}

export const DialogCreateMembers = ({ }: DialogCreateMembersProps) => {
  const appData = useAppData()
  const MembersStore = useMembersStore();
  const membersActions = useMembersActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationMembersSchema>({
    resolver: zodResolver(creationMembersSchema),
  });

  useEffect(() => {
    if (!MembersStore.openCreate) {
      reset({
        email: '',
        rolId: '',
      });
    }
  }, [MembersStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationMembersSchema) => {
    await membersActions.createMembersAction({
      email: data.email || '',
      rolId: data.rolId || '',
      workspaceId: appData.workspace?.id || ''
    })
  }

  const roles = [
    // { label: "Selecciona un rol", value: null },
    { label: "Administrador", value: DEFAULT_ROLES.ADMIN },
    { label: "Operador", value: DEFAULT_ROLES.OPERATOR },
  ]

  return <>
    <Dialog open={MembersStore.openCreate} onOpenChange={(open) => { MembersStore.setCreateState({ openCreate: open }) }} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Agregar miembro</DialogTitle>
          <DialogDescription>
            Agregado de miembros al workspace.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Correo electrónico</Label>
            <Input
              placeholder="usuario@gmail.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Rol</Label>
            <Select items={roles} onValueChange={(e) => {
              setValue('rolId', String(e), {
                shouldDirty: true,
                shouldValidate: true
              })
            }} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(el => <SelectItem key={el.value} value={el.value}>{el.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.rolId && (
              <p className="text-sm text-red-500">
                {errors.rolId.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {MembersStore.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}