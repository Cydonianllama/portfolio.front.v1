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
import { MemberStatus, DEFAULT_ROLES, MemberStatusConfiguration } from "@/api/members/members"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppData } from "@/hooks/app/useAppData"
import { useEffect } from "react"
import { useMembersActions } from "../actions/useMembersActions"
import { UpdateMembersSchema, updateMembersSchema } from "../schemas/updateMemberShema"
import { useMembersStore } from "../store/membersStore"

type DialogUpdateMembersProps = {

}

export const DialogUpdateMembers = ({ }: DialogUpdateMembersProps) => {
  const appData = useAppData()
  const MembersStore = useMembersStore();
  const membersActions = useMembersActions({})

  const currentOpened = MembersStore.list.find(el => MembersStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = useForm<UpdateMembersSchema>({
    resolver: zodResolver(updateMembersSchema),
  });

  useEffect(() => {
    if (!MembersStore.openUpdate) {
      reset({
        rolId: '',
        status: 0,
      });
    }

    if (currentOpened) {
      reset({
        rolId: currentOpened.rolId,
        status: currentOpened.status as MemberStatus || MemberStatus.active
      })
    }
  }, [MembersStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateMembersSchema) => {
    if (!currentOpened) return;
    await membersActions.updateMembersAction(currentOpened.id, {
      rolId: data.rolId || '',
      status: data.status || 0,
      workspaceId: appData.workspace?.id || ''
    })
  }

  const roles = [
    // { label: "Selecciona un rol", value: null },
    { label: "Administrador", value: DEFAULT_ROLES.ADMIN },
    { label: "Operador", value: DEFAULT_ROLES.OPERATOR },
  ]

  const allowedStatuses = [
    { label: MemberStatusConfiguration[MemberStatus.disabled].text, value: MemberStatus.disabled },
    { label: MemberStatusConfiguration[MemberStatus.active].text, value: MemberStatus.active },
  ]

  return <>
    <Dialog open={MembersStore.openUpdate} onOpenChange={(open) => { MembersStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar item</DialogTitle>
          <DialogDescription>
            Actualización de item
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Rol</Label>
            {/* <Input
              placeholder="Rol"
              {...register("rolId")}
            /> */}
            <Controller
              control={control}
              name="rolId"
              render={({ field }) => (
                <Select
                  items={roles}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>

                  <SelectContent>
                    {roles.map((el) => (
                      <SelectItem key={el.value} value={el.value}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rolId && (
              <p className="text-sm text-red-500">
                {errors.rolId.message}
              </p>
            )}

          </Field>
          <Field>
            <Label>Status</Label>
            {/* <Input
              placeholder="status"
              {...register("status")}
            /> */}
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  items={allowedStatuses}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar estatus" />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedStatuses.map(el => <SelectItem key={el.value} value={el.value}>{el.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.status && (
              <p className="text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {MembersStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}