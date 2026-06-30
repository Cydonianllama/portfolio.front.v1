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
  CreateWorkspaceSchema,
  RequestCreateWorkspace
} from "@/modules/backoffice/workspaces/schemas/item.creation";
import { DropdownUser } from "./dropdownUsers"
import { UserSelectionDTO } from "../models/dto"
import { GetUsers } from "../../users/services"

export interface ManagerV1DialogCreateConfig {
  onCreate: (data: RequestCreateWorkspace) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
}

export const ManagerV1DialogCreate = (config: ManagerV1DialogCreateConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<RequestCreateWorkspace>({
    resolver: zodResolver(CreateWorkspaceSchema),
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        mainUserId: '',
        name: ''
      });
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: RequestCreateWorkspace) => {
    await config.onCreate(data)
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
          <DialogTitle>Crear Workspace</DialogTitle>
          <DialogDescription>
            Creación de workspaces.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombres</Label>
            <Input
              placeholder="name"
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
            />
            {/* <Input
              placeholder="mainUserId"
              {...register("mainUserId")}
            /> */}
            {errors.mainUserId && (
              <p className="text-sm text-red-500">
                {errors.mainUserId.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear workspaces
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}