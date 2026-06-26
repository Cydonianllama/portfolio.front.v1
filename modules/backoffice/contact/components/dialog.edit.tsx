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
  UpdateSchema,
  updateSchema
} from "../schemas/item.update";
import { ContactDTO } from "../models/dto"
import { WorkspaceSelectionDTO } from "../models/dto"

export interface DialogEditConfig {
  onUpdate: (data: UpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: ContactDTO | null;
  updating: boolean
}


import { GetWorkspaces } from '@/modules/backoffice/workspaces/services/listItem'
import { DropdownWorkspace } from "./dropdown.workspace"

export const DialogEdit = (config: DialogEditConfig) => {

  // status
  const [workspaceSelected, setWorkspaceSelected] = useState<WorkspaceSelectionDTO | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        workspaceId: '',
        fullname: '',
      });
      setWorkspaceSelected(null)
    }

    if (config.data) {
      reset({
        fullname: config.data.name,
        workspaceId: config.data.workspaceId
      })

      if (config.data.workspaceId){
        setWorkspaceSelected({
          id: config.data.workspaceId,  
          name: config.data.workspaceName,
          logoURL: config.data.workspaceLogo
        })
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
            <Label>fullname</Label>
            <Input
              placeholder="fullname"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500">
                {errors.fullname.message}
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
            />
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