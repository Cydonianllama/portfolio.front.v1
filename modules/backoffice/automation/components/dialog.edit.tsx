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
import { DropdownWorkspace } from "./dropdown.workspace"
import { WorkspaceSelectionDTO } from "../models/dto"
import { GetWorkspaces } from '@/modules/backoffice/workspaces/services/listItem'

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateSchema,
  updateSchema
} from "@/modules/backoffice/automation/schemas/item.update";
import { ManagerV1Item } from "../types/manager.v1"
import { AutomationBackofficeDTO } from "../models/dto"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: UpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: AutomationBackofficeDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogUpdateConfig) => {

  // status
  const [workspaceSelected, setWorkspaceSelected] = useState<WorkspaceSelectionDTO | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    // defaultValues: {
    //   title: "",
    //   userId: '',
    //   workspaceId: ''
    // }
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        title: '',
        userId: '',
        workspaceId: ''
      });
      setWorkspaceSelected(null)
    }

    if (config.data) {
      reset({
        title: config.data.title,
        userId: config.data.userCreationId,
        workspaceId: config.data.workspaceId
      })
      if (config.data.workspaceId){
        setWorkspaceSelected({
          id: config.data.workspaceId,
          logoURL: '',
          name: config.data.workspaceName
        })
      } else {
        setWorkspaceSelected(null)
      }
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: UpdateSchema) => {
    config.onUpdate(data)
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
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>
            Edición de item.
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
            <Label>UserId</Label>
            <Textarea
              placeholder="User"
              {...register("userId")}
            />
            {errors.userId && (
              <p className="text-sm text-red-500">
                {errors.userId.message}
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