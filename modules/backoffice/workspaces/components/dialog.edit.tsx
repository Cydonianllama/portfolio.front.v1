/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestUpdateWorkspace,
  UpdateWorkspaceSchema
} from "@/modules/backoffice/workspaces/schemas/item.update";
import { UserSelectionDTO, WorkspaceDTO } from "../models/dto"
import { DropdownUser } from "./dropdownUsers"
import { GetUsers } from "../../users/services"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: RequestUpdateWorkspace) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: WorkspaceDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogUpdateConfig) => {

  // states 
  const [currentUserSelected, setCurrentUserSelected] = useState<UserSelectionDTO | null>(null) // guarda la configuracion en formato seleccion en caso tenga un usuario seleccionado

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<RequestUpdateWorkspace>({
    resolver: zodResolver(UpdateWorkspaceSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        mainUserId: '',
        name: ''
      });
    }

    if (config.data) {
      if (config.data.mainUser){
        const user = config.data.mainUser;

        setCurrentUserSelected({
          email: user.email,
          id: user.id,
          name: user.name,
          profileURL: '',
          role: 'None'
        })
      }
      reset({
        mainUserId: config.data.mainUser?.id || '',
        name: config.data.name
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: RequestUpdateWorkspace) => {
    config.onUpdate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  //
  // Dropdown users
  //
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [listUsers, setListUsers] = useState<Array<UserSelectionDTO>>([])

  //
  // Actions
  //

  const GetListAction = async (query: string) => {
    try {
      setLoadingUsers(true);

      const req = await GetUsers({ page: 1, query: query })
      if (!req) {
        return
      }

      if (!req.status) {
        return
      }

      if (!req.data) {
        return;
      }

      setListUsers(req.data.list.map(el => ({
        email: el.email,
        id: el.id,
        name: el.fullname,
        profileURL: '',
        role: 'None'
      })))

    } catch (ex) {
      setListUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  //
  // ON INIT 
  // 1. listar users
  //

  useEffect(() => {
    GetListAction('')
  }, [])

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      {/* 
          <DialogTrigger>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger> 
        */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar workspace</DialogTitle>
          <DialogDescription>
            Edición de workspace.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombres</Label>
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
            <Label>Usuario</Label>
            {/* <Input
              placeholder="mainUserId"
              {...register("mainUserId")}
            /> */}
            <DropdownUser
              items={listUsers}
              onSearch={(query) => { GetListAction(query) }}
              searching={loadingUsers}
              onSelect={(user) => {
                setValue("mainUserId", user.id, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              value={currentUserSelected}
            />
            {errors.mainUserId && (
              <p className="text-sm text-red-500">
                {errors.mainUserId.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}