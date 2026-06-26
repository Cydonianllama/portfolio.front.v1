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
  creationSchema,
  CreationSchema
} from "@/modules/backoffice/automation/schemas/item.creation";
import { DropdownWorkspace } from "./dropdown.workspace"
import { WorkspaceSelectionDTO } from "../models/dto"
import { GetWorkspaces } from '@/modules/backoffice/workspaces/services/listItem'
export interface ManagerV1DialogCreateConfig {
  onCreate: (data: CreationSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
}

export const ManagerV1DialogCreate = (config: ManagerV1DialogCreateConfig) => {

  // status
  const [workspaceSelected, setWorkspaceSelected] = useState<WorkspaceSelectionDTO | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<CreationSchema>({
    resolver: zodResolver(creationSchema),
  });
  /**
  onSelect={(workspace) => {
    setValue('workspaceId', workspace.id, {
      shouldValidate: true
    });
  }}
   */

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        title: '',
        workspaceId: '',
        userCreationId: '',
      });
      setWorkspaceSelected(null)
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: CreationSchema) => {
    await config.onCreate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  //
  // Dropdown users
  //
  const [loadingWorkspaces, setloadingWorkspaces] = useState(false)
  const [listWorkspaces, setListWorkspaces] = useState<Array<WorkspaceSelectionDTO>>([])

  //
  // Actions
  //

  const GetListAction = async (query: string) => {
    try {
      setloadingWorkspaces(true);

      const req = await GetWorkspaces({ page: 1, query: query })

      if (!req) {
        return
      }

      if (!req.status) {
        return
      }

      if (!req.data) {
        return;
      }

      setListWorkspaces(req.data.list.map(el => ({
        id: el.id,
        logoURL: '',
        name: el.name
      })))

    } catch (ex) {
      setListWorkspaces([])
    } finally {
      setloadingWorkspaces(false)
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
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de items.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Título"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>Workspace</Label>
            <DropdownWorkspace
              value={workspaceSelected}
              items={listWorkspaces}
              onSearch={(query) => {
                GetListAction(query)
              }}
              searching={loadingWorkspaces}
              onSelect={(workspace) => {
                setWorkspaceSelected(workspace)
                setValue('workspaceId', workspace.id, {
                  shouldDirty: true,
                  shouldValidate: true
                })
              }}
            // value={}
            />
            {/* <Textarea
              placeholder="WorkspaceId"
              {...register("workspaceId")}
            />
            {errors.workspaceId && (
              <p className="text-sm text-red-500">
                {errors.workspaceId.message}
              </p>
            )} */}
          </Field>

          <Field>
            <Label>UserCreationId</Label>
            <Textarea
              placeholder="UserId"
              {...register("userCreationId")}
            />
            {errors.userCreationId && (
              <p className="text-sm text-red-500">
                {errors.userCreationId.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}