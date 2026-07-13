'use client'
/*
  EntityName
*/

/*
  NameComponent
*/

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

type NameComponentProps = {

}

export const NameComponentSection = ({ }: NameComponentProps) => {
  const _Item_Store_Store = use_Item_Store_Store();
  const useEntityNameActions = UseEntityNameActions({})

  const InitialList = () => {
    useEntityNameActions.listEntityNameAction({ page: 1 })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={_Item_Store_Store.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { _Item_Store_Store.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      {/* <NameComponentList_
        isError={false}
        isLoading={_Item_Store_Store.listing}
        list={_Item_Store_Store.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          _Item_Store_Store.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          _Item_Store_Store.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <NameComponentTable_
        isError={false}
        isLoading={_Item_Store_Store.listing}
        list={_Item_Store_Store.list}
        handleDelete={(id, item) => {
          _Item_Store_Store.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          _Item_Store_Store.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <NameComponentFooterTable
        HandleToNextPage={() => {
          if (!_Item_Store_Store.pagination) return;
          _Item_Store_Store.setListState({
            pagination: {
              ..._Item_Store_Store.pagination,
              page: _Item_Store_Store.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!_Item_Store_Store.pagination) return;
          _Item_Store_Store.setListState({
            pagination: {
              ..._Item_Store_Store.pagination,
              page: _Item_Store_Store.pagination?.page - 1,
            }
          })
        }}
        pagination={_Item_Store_Store.pagination}
      />
    </div>

    <DialogCreateNameComponent />
    <DialogUpdateNameComponent />
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

type NameComponentTableProps = {
  handleEdit: (id: string, data: name_entityDTO) => void
  handleDelete: (id: string, data: name_entityDTO) => void
  list: Array<name_entityDTO>
  isLoading: boolean
  isError: boolean
}

export const NameComponentTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: NameComponentTableProps) => {
  // const _Item_Store_Store = use_Item_Store_Store();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<name_entityDTO>[] = [
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
  data: CellContext<name_entityDTO, unknown>
  handleEdit: (id: string, data: name_entityDTO) => void
  handleDelete: (id: string, data: name_entityDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const _Item_Store_Store = use_Item_Store_Store();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // _Item_Store_Store.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
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
          // _Item_Store_Store.setDeleteState({ currentElementSelected: item.id, openDelete: true })
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

export type NameComponentFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const NameComponentFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: NameComponentFooterTableProps) => {
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

type DialogCreateNameComponentProps = {

}

const DialogCreateNameComponent = ({ }: DialogCreateNameComponentProps) => {
  const _Item_Store_Store = use_Item_Store_Store();
  const useEntityNameActions = UseEntityNameActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationEntityNameSchema>({
    resolver: zodResolver(creationEntityNameSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!_Item_Store_Store.openCreate) {
      reset({
        name: '',
      });
    }
  }, [_Item_Store_Store.openCreate, reset]);

  const HandleToCreate = async (data: CreationEntityNameSchema) => {
    await useEntityNameActions.createEntityNameAction({
      name: data.name
    })
  }

  return <>
    <Dialog open={_Item_Store_Store.openCreate} onOpenChange={(open) => { _Item_Store_Store.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={_Item_Store_Store.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {_Item_Store_Store.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateNameComponentProps = {

}

const DialogUpdateNameComponent = ({ }: DialogUpdateNameComponentProps) => {
  const _Item_Store_Store = use_Item_Store_Store();
  const useEntityNameActions = UseEntityNameActions({})

  const currentOpened = _Item_Store_Store.list.find(el => _Item_Store_Store.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateEntityNameSchema>({
    resolver: zodResolver(updateEntityNameSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!_Item_Store_Store.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [_Item_Store_Store.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateEntityNameSchema) => {
    if (!currentOpened) return;
    await useEntityNameActions.updateEntityNameAction(currentOpened.id, {
      name: data.name
    })
  }
  return <>
    <Dialog open={_Item_Store_Store.openUpdate} onOpenChange={(open) => { _Item_Store_Store.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={_Item_Store_Store.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {_Item_Store_Store.updating && <Spinner data-icon="inline-start" />}
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
  const _Item_Store_Store = use_Item_Store_Store();
  const useEntityNameActions = UseEntityNameActions({})

  const HandleToDelete = () => {
    if (!_Item_Store_Store.currentElementSelected) return;
    useEntityNameActions.deleteEntityNameAction({ id: _Item_Store_Store.currentElementSelected || '' })
  }

  return <>
    <Dialog open={_Item_Store_Store.openDelete} onOpenChange={(open) => { _Item_Store_Store.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={_Item_Store_Store.deleting ? true : false} onClick={HandleToDelete} type="button">
            {_Item_Store_Store.deleting && <Spinner data-icon="inline-start" />}
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

export const creationEntityNameSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationEntityNameSchema = z.infer<typeof creationEntityNameSchema>;

// update schema

export const updateEntityNameSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateEntityNameSchema = z.infer<typeof updateEntityNameSchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseEntityNameActionsProps = {

}

export const UseEntityNameActions = ({ }: UseEntityNameActionsProps) => {
  const _Item_Store_Store = use_Item_Store_Store();

  const createEntityNameAction = useCallback(async (data: Createname_entityRequestDTO) => {
    try {
      _Item_Store_Store.setCreateState({ creating: true })
      const reqCreation = await Createname_entity(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.property_entity && reqCreation.status) {
        const list = [reqCreation?.data.property_entity, ..._Item_Store_Store.list]
        _Item_Store_Store.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      _Item_Store_Store.setCreateState({ creating: false, openCreate: false })
    }
  }, [_Item_Store_Store.list])

  const updateEntityNameAction = useCallback(async (id: string, data: Updatename_entityRequestDTO) => {
    try {
      _Item_Store_Store.setUpdateState({ updating: true })
      const reqUpdate = await Updatename_entity(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.property_entity) {
        let list = [..._Item_Store_Store.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.property_entity || el
          } else {
            return el;
          }
        })
        _Item_Store_Store.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      _Item_Store_Store.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [_Item_Store_Store.list])

  const listEntityNameAction = useCallback(async (data: Getname_entitysRequestDTO) => {
    try {
      _Item_Store_Store.setListState({ listing: true })

      if (data.page == 1) {
        _Item_Store_Store.setListState({ list: [] })
      }

      const reqList = await Getname_entity(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        _Item_Store_Store.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          _Item_Store_Store.setListState({ list: reqList.data.list })
        } else {
          _Item_Store_Store.setListState({ list: [..._Item_Store_Store.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      _Item_Store_Store.setListState({ listing: false })
    }
  }, [])

  const deleteEntityNameAction = useCallback(async (data: Deletename_entityRequestDTO) => {
    try {
      _Item_Store_Store.setDeleteState({ deleting: true })
      const reqDelete = await Deletename_entity(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [..._Item_Store_Store.list]
        list = list.filter(el => el.id != data.id)
        _Item_Store_Store.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      _Item_Store_Store.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [_Item_Store_Store.list])

  return {
    createEntityNameAction,
    updateEntityNameAction,
    listEntityNameAction,
    deleteEntityNameAction,
  }
}
// #endregion Hooks

/*
  _Item_Store_
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface _Item_Store_Store {
  // state: string | null,
  // setState: (data: Partial<{ state: string | null }>) => void
  // setState2: (state: string) => void

  currentElementSelected: string | null
  pagination: ResponsePagination | null

  // create
  openCreate: boolean;
  creating: boolean;
  setCreateState: (data: Partial<{ openCreate: boolean, creating: boolean, currentElementSelected: string | null }>) => void
  // update
  openUpdate: boolean;
  updating: boolean;
  setUpdateState: (data: Partial<{ openUpdate: boolean, updating: boolean, currentElementSelected: string | null }>) => void

  // delete
  openDelete: boolean;
  deleting: boolean;
  setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean, currentElementSelected: string | null }>) => void

  // getall
  list: Array<name_entityDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<name_entityDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const use_Item_Store_Store = create<_Item_Store_Store>((set) => ({
  // state: null,
  // setState: (data) => set((state) => ({ ...state, ...data })),
  // setState2: (data) => set((state) => ({ ...state, state: data })),
  currentElementSelected: null,
  pagination: null,
  //create
  openCreate: false,
  creating: false,
  setCreateState: (data) => set((state) => ({ ...state, ...data })),
  //update
  openUpdate: false,
  updating: false,
  setUpdateState: (data) => set((state) => ({ ...state, ...data })),
  //delete
  openDelete: false,
  deleting: false,
  setDeleteState: (data) => set((state) => ({ ...state, ...data })),

  // getall
  list: [],
  listing: false,
  setListState: (data) => set((state) => ({ ...state, ...data }))
}));
// #endregion Store

// Reemplazar por los nombre correctos
/*
test_entity
/api/entity_api
name_entity
property_entity
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

export const Getname_entity = async (data: Getname_entitysRequestDTO): Promise<ResponseApi<Getname_entitysResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/entity_api?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const Updatename_entity = async (id: string, data: Updatename_entityRequestDTO): Promise<ResponseApi<Updatename_entityResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/entity_api/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Createname_entity = async (data: Createname_entityRequestDTO): Promise<ResponseApi<Createname_entityResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/entity_api`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const Deletename_entity = async (data: Deletename_entityRequestDTO): Promise<ResponseApi<Deletename_entityResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/entity_api/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export interface name_entityDTO {
  id: string;
  name: string
}

// get one
export interface Getname_entityRequestDTO {
  id: string;
}

export interface Getname_entityResponseDTO {
  property_entity: name_entityDTO | null
}

// get many
export interface Getname_entitysRequestDTO {
  page: number
}

export interface Getname_entitysResponseDTO {
  list: Array<name_entityDTO>
}

// update one
export interface Updatename_entityRequestDTO {
  name: string;
}

export interface Updatename_entityResponseDTO {
  property_entity: name_entityDTO | null
}

// delete one
export interface Deletename_entityRequestDTO {
  id: string
}

export interface Deletename_entityResponseDTO {
  id: string
}

// create one
export interface Createname_entityRequestDTO {
  name: string;
}

export interface Createname_entityResponseDTO {
  property_entity: name_entityDTO | null
}
// #endregion API