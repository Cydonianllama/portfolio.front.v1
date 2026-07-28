'use client'
/*
  Entity
*/

/*
  Entity
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FieldSection } from "./scratch_fields"
import { useEntityStore } from "./store/entity.store"
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
import { useCallback, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineEdit } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ResponsePagination } from '@/types/api/utils.pagination';

//___________ ___________ Main

type EntityProps = {

}

export const EntitySection = ({ }: EntityProps) => {
  const EntityStore = useEntityStore();
  const useEntityActions = UseEntityActions({})
  const useAppData = UseAppData()
  
  const InitialList = () => {
    useEntityActions.listEntityAction({ page: 1, workspaceId: useAppData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    if (useAppData.workspace?.id) OnInit()
  }, [useAppData.workspace?.id])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={EntityStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { EntityStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      {/* <EntityList_
        isError={false}
        isLoading={EntityStore.listing}
        list={EntityStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <EntityTable_
        isError={false}
        isLoading={EntityStore.listing}
        list={EntityStore.list}
        handleDelete={(id, item) => {
          EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <EntityFooterTable
        HandleToNextPage={() => {
          if (!EntityStore.pagination) return;
          EntityStore.setListState({
            pagination: {
              ...EntityStore.pagination,
              page: EntityStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!EntityStore.pagination) return;
          EntityStore.setListState({
            pagination: {
              ...EntityStore.pagination,
              page: EntityStore.pagination?.page - 1,
            }
          })
        }}
        pagination={EntityStore.pagination}
      />
    </div>

    <DialogCreateEntity />
    <DialogUpdateEntity />
    <DialogConfirmDelete />
  </>
}

// #region tabletemp
//
// START::STYLETABLE
//

//___________ ___________ Table
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
// import { useCallback, useEffect, useState } from "react"
// import { format } from 'date-fns';
// import { Checkbox } from "@/components/ui/checkbox";
// import { MdOutlineEdit } from 'react-icons/md';
import { MdOutlineLabel } from 'react-icons/md';
// import { FiTrash2 } from 'react-icons/fi';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// react-table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';

type EntityTableProps = {
  handleEdit: (id: string, data: entityDTO) => void
  handleDelete: (id: string, data: entityDTO) => void
  list: Array<entityDTO>
  isLoading: boolean
  isError: boolean
}

export const EntityTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: EntityTableProps) => {
  // const EntityStore = useEntityStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<entityDTO>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Seleccionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Id"
    },
    {
      accessorKey: "name",
      header: "Nombre"
    },
    // {
    //   id: 'date',
    //   header: 'Fecha de creación',
    //   cell: (data) => {
    //     return (<>
    //       {data.row.original.creationDate && (<>{format(data.row.original.creationDate, 'dd/MM/yyyy')}</>)}
    //     </>)
    //   }
    // },
    {
      id: "actions",
      header: "Acciones",
      cell: (data) => {
        return (<ActionsRow
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />)
      }
    }
  ];

  const table = useReactTable({
    data: list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel(),

    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id, // recomendado
  });

  return <>
    {isLoading && (<>
      <SpinnerListing
        title="Items"
        description="Listando sus items."
      />
    </>)}

    {(!isLoading && isError) && (<>
      <ErrorStateComponent
      />
    </>)}

    {(!isLoading && !isError) && (<>
      {list.length > 0 && (<>
        <div className="border rounded flex-1">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group, headerIdx) => (
                <TableRow key={headerIdx}>
                  {group.headers.map((header, index) => (
                    <TableHead className={(index == group.headers.length - 1) ? 'text-end' : ''} key={index}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <TableCell className={(cellIdx == row.getVisibleCells().length - 1) ? 'flex justify-end' : ''} key={cellIdx}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>)}
      {list.length == 0 && (<>
        <EmptyStateComponent
          description="Usted no cuenta con items."
          title="Items"
          isActiveCreate
          isActiveImport={false}
          isActiveLearn={false}
          onClickCreate={() => { }}
          textButtonCreate={'Agregar item'}
          mainIcon={<MdOutlineLabel />}
        />
      </>)}
    </>)}

  </>
}

//--
// ActionsRow
type ActionsRowProps = {
  data: CellContext<entityDTO, unknown>
  handleEdit: (id: string, data: entityDTO) => void
  handleDelete: (id: string, data: entityDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const EntityStore = useEntityStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
          handleEdit(item.id, item)
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", item.id)
          // EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
          handleDelete(item.id, item)
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

// components
//import { Button } from '@/components/ui/button'
//import { ResponsePagination } from '@/types/api/utils.pagination';

// icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { ResponsePagination } from "@/types/api/utils.pagination";

export type EntityFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const EntityFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: EntityFooterTableProps) => {
  return (<>
    <div className='flex justify-between items-center py-4'>
      <div>{((pagination?.page || 0) - 1) * (pagination?.limit || 0)}-{((pagination?.page || 0) - 1) * (pagination?.limit || 0) + (pagination?.limit || 0)} de <strong>{pagination?.total || 0}</strong></div>
      <div className='flex gap-5 items-center'>
        <Button
          size={'icon'}
          variant="outline"
          onClick={HandleToPrevPage}
          disabled={pagination?.hasPreviousPage ? false : true}
        >
          <FaChevronLeft />
        </Button>
        <span>{pagination?.page}/{pagination?.totalPages}</span>
        <Button
          onClick={HandleToNextPage}
          size={'icon'}
          variant="outline"
          disabled={pagination?.hasNextPage ? false : true}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  </>)
}

//
// END::STYLETABLE
//
// #endregion tabletemp

// #region dialogs
//___________ ___________ Dialog Create
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Spinner } from "@/components/ui/spinner"
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

type DialogCreateEntityProps = {

}

const DialogCreateEntity = ({ }: DialogCreateEntityProps) => {
  const EntityStore = useEntityStore();
  const useEntityActions = UseEntityActions({})
  const useAppData = UseAppData()
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
    await useEntityActions.createEntityAction({
      name: data.name,
      workspaceId: useAppData.workspace?.id || '',
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

//___________ ___________ Dialog Update
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Spinner } from "@/components/ui/spinner"
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

type DialogUpdateEntityProps = {

}

const DialogUpdateEntity = ({ }: DialogUpdateEntityProps) => {
  const EntityStore = useEntityStore();
  const useEntityActions = UseEntityActions({})
  const useAppData = UseAppData()
  const currentOpened = EntityStore.list.find(el => EntityStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateEntitySchema>({
    resolver: zodResolver(updateEntitySchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!EntityStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [EntityStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateEntitySchema) => {
    if (!currentOpened) return;
    await useEntityActions.updateEntityAction(currentOpened.id, {
      name: data.name,
      workspaceId: useAppData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={EntityStore.openUpdate} onOpenChange={(open) => { EntityStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-lg">
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
        <FieldSection />
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={EntityStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {EntityStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

//___________ ___________ Dialog Confirm Delete
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Spinner } from "@/components/ui/spinner"
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

type DialogConfirmDelete = {

}

const DialogConfirmDelete = ({ }: DialogConfirmDelete) => {
  const EntityStore = useEntityStore();
  const useEntityActions = UseEntityActions({})
  const useAppData = UseAppData()
  const HandleToDelete = () => {
    if (!EntityStore.currentElementSelected) return;
    useEntityActions.deleteEntityAction({ id: EntityStore.currentElementSelected || '', workspaceId: useAppData.workspace?.id || '' })
  }

  return <>
    <Dialog open={EntityStore.openDelete} onOpenChange={(open) => { EntityStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={EntityStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {EntityStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
// #endregion dialogs

// #endregion Components

// #region Schemas
//___________ schemas 

import { z } from "zod/v3";

// creation schema

export const creationEntitySchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationEntitySchema = z.infer<typeof creationEntitySchema>;

// update schema

export const updateEntitySchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateEntitySchema = z.infer<typeof updateEntitySchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { entityDTO, CreateentityRequestDTO, Createentity, UpdateentityRequestDTO, Updateentity, GetentitysRequestDTO, Getentity, DeleteentityRequestDTO, Deleteentity } from "@/api/dataEngine/entity"
import { UseAppData } from "@/hooks/app/useAppData"

export type UseEntityActionsProps = {

}

export const UseEntityActions = ({ }: UseEntityActionsProps) => {
  const EntityStore = useEntityStore();

  const createEntityAction = useCallback(async (data: CreateentityRequestDTO) => {
    try {
      EntityStore.setCreateState({ creating: true })
      const reqCreation = await Createentity(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.entity && reqCreation.status) {
        const list = [reqCreation?.data.entity, ...EntityStore.list]
        EntityStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      EntityStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [EntityStore.list])

  const updateEntityAction = useCallback(async (id: string, data: UpdateentityRequestDTO) => {
    try {
      EntityStore.setUpdateState({ updating: true })
      const reqUpdate = await Updateentity(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.entity) {
        let list = [...EntityStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.entity || el
          } else {
            return el;
          }
        })
        EntityStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      EntityStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [EntityStore.list])

  const listEntityAction = useCallback(async (data: GetentitysRequestDTO) => {
    try {
      EntityStore.setListState({ listing: true })

      if (data.page == 1) {
        EntityStore.setListState({ list: [] })
      }

      const reqList = await Getentity(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        EntityStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          EntityStore.setListState({ list: reqList.data.list })
        } else {
          EntityStore.setListState({ list: [...EntityStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      EntityStore.setListState({ listing: false })
    }
  }, [])

  const deleteEntityAction = useCallback(async (data: DeleteentityRequestDTO) => {
    try {
      EntityStore.setDeleteState({ deleting: true })
      const reqDelete = await Deleteentity(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...EntityStore.list]
        list = list.filter(el => el.id != data.id)
        EntityStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      EntityStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [EntityStore.list])

  return {
    createEntityAction,
    updateEntityAction,
    listEntityAction,
    deleteEntityAction,
  }
}
// #endregion Hooks