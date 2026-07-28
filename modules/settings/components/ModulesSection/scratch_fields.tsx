'use client'
import { EntityFieldType } from '@erick/dataengine'
// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */

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

type FieldProps = {

}

export const FieldSection = ({ }: FieldProps) => {
  const FieldStore = useFieldStore();
  const useFieldActions = UseFieldActions({})
  const entityStore = useEntityStore()
  const useAppData = UseAppData()
  const InitialList = () => {
    useFieldActions.listFieldAction({ page: 1, workspaceId: useAppData.workspace?.id || '', entityId: entityStore.currentElementSelected || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    if (useAppData.workspace?.id && entityStore.currentElementSelected) OnInit()
  }, [useAppData.workspace?.id, entityStore.currentElementSelected])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={FieldStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button variant={'outline'} onClick={() => { FieldStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      {/* <FieldList_
        isError={false}
        isLoading={FieldStore.listing}
        list={FieldStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          FieldStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          FieldStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <FieldTable_
        isError={false}
        isLoading={FieldStore.listing}
        list={FieldStore.list}
        handleDelete={(id, item) => {
          FieldStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          FieldStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <FieldFooterTable
        HandleToNextPage={() => {
          if (!FieldStore.pagination) return;
          FieldStore.setListState({
            pagination: {
              ...FieldStore.pagination,
              page: FieldStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!FieldStore.pagination) return;
          FieldStore.setListState({
            pagination: {
              ...FieldStore.pagination,
              page: FieldStore.pagination?.page - 1,
            }
          })
        }}
        pagination={FieldStore.pagination}
      />
    </div>

    <DialogCreateField />
    <DialogUpdateField />
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

type FieldTableProps = {
  handleEdit: (id: string, data: FieldDTO) => void
  handleDelete: (id: string, data: FieldDTO) => void
  list: Array<FieldDTO>
  isLoading: boolean
  isError: boolean
}

export const FieldTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: FieldTableProps) => {
  // const FieldStore = useFieldStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<FieldDTO>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) =>
    //         table.toggleAllPageRowsSelected(!!value)
    //       }
    //       aria-label="Seleccionar todos"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) =>
    //         row.toggleSelected(!!value)
    //       }
    //       aria-label="Seleccionar fila"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: "id",
    //   header: "Id"
    // },
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
  data: CellContext<FieldDTO, unknown>
  handleEdit: (id: string, data: FieldDTO) => void
  handleDelete: (id: string, data: FieldDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const FieldStore = useFieldStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // FieldStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
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
          // FieldStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
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

export type FieldFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const FieldFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: FieldFooterTableProps) => {
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

type DialogCreateFieldProps = {

}

const DialogCreateField = ({ }: DialogCreateFieldProps) => {
  const FieldStore = useFieldStore();
  const useFieldActions = UseFieldActions({})
  const useAppData = UseAppData()
  const entityStore = useEntityStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationFieldSchema>({
    resolver: zodResolver(creationFieldSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FieldStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [FieldStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationFieldSchema) => {
    await useFieldActions.createFieldAction({
      name: data.name,
      workspaceId: useAppData.workspace?.id || '',
      entityId: entityStore.currentElementSelected || '',
      type: EntityFieldType.string
    })
  }

  return <>
    <Dialog open={FieldStore.openCreate} onOpenChange={(open) => { FieldStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={FieldStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {FieldStore.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateFieldProps = {

}

const DialogUpdateField = ({ }: DialogUpdateFieldProps) => {
  const FieldStore = useFieldStore();
  const useFieldActions = UseFieldActions({})
  const useAppData = UseAppData()
  const currentOpened = FieldStore.list.find(el => FieldStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateFieldSchema>({
    resolver: zodResolver(updateFieldSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FieldStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [FieldStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateFieldSchema) => {
    if (!currentOpened) return;
    await useFieldActions.updateFieldAction(currentOpened.id, {
      name: data.name,
      workspaceId: useAppData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={FieldStore.openUpdate} onOpenChange={(open) => { FieldStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={FieldStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {FieldStore.updating && <Spinner data-icon="inline-start" />}
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
  const FieldStore = useFieldStore();
  const useFieldActions = UseFieldActions({})

  const useAppData = UseAppData()

  const HandleToDelete = () => {
    if (!FieldStore.currentElementSelected) return;
    useFieldActions.deleteFieldAction({ id: FieldStore.currentElementSelected || '', workspaceId: useAppData.workspace?.id || '' })
  }

  return <>
    <Dialog open={FieldStore.openDelete} onOpenChange={(open) => { FieldStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FieldStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {FieldStore.deleting && <Spinner data-icon="inline-start" />}
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

export const creationFieldSchema = z.object({
  name: z.string().min(1, "Mínimo 3 caracteres"),
});

export type CreationFieldSchema = z.infer<typeof creationFieldSchema>;

// update schema

export const updateFieldSchema = z.object({
  name: z.string().min(1, "Mínimo 3 caracteres"),
});

export type UpdateFieldSchema = z.infer<typeof updateFieldSchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseFieldActionsProps = {

}

export const UseFieldActions = ({ }: UseFieldActionsProps) => {
  const FieldStore = useFieldStore();

  const createFieldAction = useCallback(async (data: CreateFieldRequestDTO) => {
    try {
      FieldStore.setCreateState({ creating: true })
      const reqCreation = await CreateField(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.field && reqCreation.status) {
        const list = [reqCreation?.data.field, ...FieldStore.list]
        FieldStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      FieldStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [FieldStore.list])

  const updateFieldAction = useCallback(async (id: string, data: UpdateFieldRequestDTO) => {
    try {
      FieldStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateField(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.field) {
        let list = [...FieldStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.field || el
          } else {
            return el;
          }
        })
        FieldStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      FieldStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [FieldStore.list])

  const listFieldAction = useCallback(async (data: GetFieldsRequestDTO) => {
    try {
      FieldStore.setListState({ listing: true })

      if (data.page == 1) {
        FieldStore.setListState({ list: [] })
      }

      const reqList = await GetField(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        FieldStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          FieldStore.setListState({ list: reqList.data.list })
        } else {
          FieldStore.setListState({ list: [...FieldStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      FieldStore.setListState({ listing: false })
    }
  }, [])

  const deleteFieldAction = useCallback(async (data: DeleteFieldRequestDTO) => {
    try {
      FieldStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteField(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...FieldStore.list]
        list = list.filter(el => el.id != data.id)
        FieldStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      FieldStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [FieldStore.list])

  return {
    createFieldAction,
    updateFieldAction,
    listFieldAction,
    deleteFieldAction,
  }
}
// #endregion Hooks


// Reemplazar por los nombre correctos
/*
test_entity
/api/workspaces/${data.workspaceId}/dataengine/fields
Field
field
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { UseAppData } from "@/hooks/app/useAppData"
import { useFieldStore } from "./store/field.store"
import { useEntityStore } from './store/entity.store'

export const GetField = async (data: GetFieldsRequestDTO): Promise<ResponseApi<GetFieldsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/dataengine/fields?page=${data.page}&entityId=${data.entityId}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}


export const UpdateField = async (id: string, data: UpdateFieldRequestDTO): Promise<ResponseApi<UpdateFieldResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/workspaces/${data.workspaceId}/dataengine/fields/${id}`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const CreateField = async (data: CreateFieldRequestDTO): Promise<ResponseApi<CreateFieldResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/dataengine/fields`, data);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}

export const DeleteField = async (data: DeleteFieldRequestDTO): Promise<ResponseApi<DeleteFieldResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/dataengine/fields/${data.id}`);
    return req.data;
  } catch (ex) {
    if (axios.isAxiosError(ex)) {
      // console.log(error.response?.status); // 422
      // console.log(error.response?.data);  
      return ex.response?.data ?? null;
    }
    return null
  }
}


///
/// DTOs
///

export interface FieldDTO {
  id: string;
  name: string
  type: EntityFieldType,
  entityId: string
}

// get one
export interface GetFieldRequestDTO {
  id: string;
  workspaceId: string
}

export interface GetFieldResponseDTO {
  field: FieldDTO | null
}

// get many
export interface GetFieldsRequestDTO {
  page: number
  workspaceId: string
  entityId: string;
}

export interface GetFieldsResponseDTO {
  list: Array<FieldDTO>
}

// update one
export interface UpdateFieldRequestDTO {
  name: string;
  workspaceId: string
}

export interface UpdateFieldResponseDTO {
  field: FieldDTO | null
}

// delete one
export interface DeleteFieldRequestDTO {
  id: string
  workspaceId: string
}

export interface DeleteFieldResponseDTO {
  id: string
}

// create one
export interface CreateFieldRequestDTO {
  name: string;
  workspaceId: string
  type: EntityFieldType,
  entityId: string
}

export interface CreateFieldResponseDTO {
  field: FieldDTO | null
}
// #endregion API