'use client'
/*
  Folder
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */

/*
  Folder
*/

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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

//___________ ___________ Main


type FolderProps = {

}

export const FolderSection = ({ }: FolderProps) => {
  const useFolderActions = UseFolderActions({})
  const FolderStore = useFolderStore();

  const InitialList = () => {
    useFolderActions.listFolderAction({ page: 1 })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={FolderStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { FolderStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>
      <FolderTable />
    </div>
    <DialogCreateFolder />
    <DialogUpdateFolder />
    <DialogConfirmDelete />
  </>
}

//___________ ___________ Table
//import { useCallback, useEffect, useState } from "react"
//import { format } from 'date-fns';
//import { Checkbox } from "@/components/ui/checkbox";
// import { MdOutlineEdit } from 'react-icons/md';
// import { FiTrash2 } from 'react-icons/fi';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
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

// ActionsRow
const ActionsRow = ({ data }: { data: CellContext<FolderDTO, unknown> }) => {
  const item = data.row.original;
  const FolderStore = useFolderStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          FolderStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", item.id)
          FolderStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

type FolderTableProps = {

}

export const FolderTable = ({ }: FolderTableProps) => {
  const FolderStore = useFolderStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<FolderDTO>[] = [
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
        return (<ActionsRow data={data} />)
      }
    }
  ];

  const table = useReactTable({
    data: FolderStore.list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel(),

    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id, // recomendado
  });


  return <>
    {FolderStore.list.length > 0 && (<>
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
  </>
}

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

type DialogCreateFolderProps = {

}

const DialogCreateFolder = ({ }: DialogCreateFolderProps) => {
  const FolderStore = useFolderStore();
  const useFolderActions = UseFolderActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationFolderSchema>({
    resolver: zodResolver(creationFolderSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FolderStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [FolderStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationFolderSchema) => {
    await useFolderActions.createFolderAction({
      name: data.name
    })
  }

  return <>
    <Dialog open={FolderStore.openCreate} onOpenChange={(open) => { FolderStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={FolderStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {FolderStore.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateFolderProps = {

}

const DialogUpdateFolder = ({ }: DialogUpdateFolderProps) => {
  const FolderStore = useFolderStore();
  const useFolderActions = UseFolderActions({})

  const currentOpened = FolderStore.list.find(el => FolderStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateFolderSchema>({
    resolver: zodResolver(updateFolderSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!FolderStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [FolderStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateFolderSchema) => {
    if (!currentOpened) return;
    await useFolderActions.updateFolderAction(currentOpened?.id, {
      name: data.name
    })
  }
  return <>
    <Dialog open={FolderStore.openUpdate} onOpenChange={(open) => { FolderStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={FolderStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {FolderStore.updating && <Spinner data-icon="inline-start" />}
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
  const FolderStore = useFolderStore();
  const useFolderActions = UseFolderActions({})

  const HandleToDelete = () => {
    if (!FolderStore.currentElementSelected) return;
    useFolderActions.deleteFolderAction({ id: FolderStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={FolderStore.openDelete} onOpenChange={(open) => { FolderStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={FolderStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {FolderStore.deleting && <Spinner data-icon="inline-start" />}
            Confirmar eliminación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

// #region Schemas
//___________ schemas 

import { z } from "zod/v3";

// creation schema

export const creationFolderSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationFolderSchema = z.infer<typeof creationFolderSchema>;

// update schema

export const updateFolderSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateFolderSchema = z.infer<typeof updateFolderSchema>;

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseFolderActionsProps = {

}

export const UseFolderActions = ({ }: UseFolderActionsProps) => {
  const FolderStore = useFolderStore();

  const createFolderAction = useCallback(async (data: CreateFolderRequestDTO) => {
    try {
      FolderStore.setCreateState({ creating: true })
      const reqCreation = await CreateFolder(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.folder && reqCreation.status) {
        const list = [reqCreation?.data.folder, ...FolderStore.list]
        FolderStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      FolderStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [FolderStore.list])

  const updateFolderAction = useCallback(async (id: string, data: UpdateFolderRequestDTO) => {
    try {
      FolderStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateFolder(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.folder) {
        let list = [...FolderStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.folder || el
          } else {
            return el;
          }
        })
        FolderStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      FolderStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [FolderStore.list])

  const listFolderAction = useCallback(async (data: GetFoldersRequestDTO) => {
    try {
      FolderStore.setListState({ listing: true })

      if (data.page == 1) {
        FolderStore.setListState({ list: [] })
      }

      const reqList = await GetFolder(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        if (data.page == 1) {
          FolderStore.setListState({ list: reqList.data.list })
        } else {
          FolderStore.setListState({ list: [...FolderStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      FolderStore.setListState({ listing: false })
    }
  }, [FolderStore.list])

  const deleteFolderAction = useCallback(async (data: DeleteFolderRequestDTO) => {
    try {
      FolderStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteFolder(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...FolderStore.list]
        list = list.filter(el => el.id != data.id)
        FolderStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      FolderStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [FolderStore.list])

  return {
    createFolderAction,
    updateFolderAction,
    listFolderAction,
    deleteFolderAction,
  }
}

// #region Store
//___________ store

/*
  Folder
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface FolderStore {
  // state: string | null,
  // setState: (data: Partial<{ state: string | null }>) => void
  // setState2: (state: string) => void

  currentElementSelected: string | null

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
  list: Array<FolderDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<FolderDTO>, listing: boolean }>) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
  // state: null,
  // setState: (data) => set((state) => ({ ...state, ...data })),
  // setState2: (data) => set((state) => ({ ...state, state: data })),
  currentElementSelected: null,
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


// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';


// Reemplazar por los nombre correctos
/*

test_entity
/api/folders
Folder
folder

*/

export const GetFolder = async (data: GetFoldersRequestDTO): Promise<ResponseApi<GetFoldersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/folders?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateFolder = async (id: string, data: UpdateFolderRequestDTO): Promise<ResponseApi<UpdateFolderResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/folders/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateFolder = async (data: CreateFolderRequestDTO): Promise<ResponseApi<CreateFolderResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/folders`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteFolder = async (data: DeleteFolderRequestDTO): Promise<ResponseApi<DeleteFolderResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/folders/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export interface FolderDTO {
  id: string;
  name: string
}

// get one
export interface GetFolderRequestDTO {
  id: string;
}

export interface GetFolderResponseDTO {
  folder: FolderDTO | null
}

// get many
export interface GetFoldersRequestDTO {
  page: number
}

export interface GetFoldersResponseDTO {
  list: Array<FolderDTO>
}

// update one
export interface UpdateFolderRequestDTO {
  name: string;
}

export interface UpdateFolderResponseDTO {
  folder: FolderDTO | null
}

// delete one
export interface DeleteFolderRequestDTO {
  id: string
}

export interface DeleteFolderResponseDTO {
  id: string
}

// create one
export interface CreateFolderRequestDTO {
  name: string;
}

export interface CreateFolderResponseDTO {
  folder: FolderDTO | null
}