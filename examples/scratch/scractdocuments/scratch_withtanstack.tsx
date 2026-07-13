/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/*
  EntityName
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */

/*
  NameComponent
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
// import { NameComponentList_ } from "./showcase.list.scratch"
// import { NameComponentTable_ } from "./showcase.table.scratch"

//___________ ___________ Main

type NameComponentProps = {

}

export const NameComponentSection = ({ }: NameComponentProps) => {
  const _Item_Store_Store = use_Item_Store_Store();

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch
  } = UselistEntityNameAction(_Item_Store_Store.pagination?.page || 1)


  useEffect(() => {
    if (data) {

      if (!data.status) {
        toast.error('[Error 1]')
        return;
      }

      if (_Item_Store_Store.pagination?.page == 1 || !_Item_Store_Store.pagination?.page) {
        _Item_Store_Store.setListState({ list: [] })
      }

      if (data.status && data.data.list) {
        _Item_Store_Store.setListState({ pagination: data.pagination })
        if (_Item_Store_Store.pagination?.page == 1 || !_Item_Store_Store.pagination?.page) {
          _Item_Store_Store.setListState({ list: data.data.list })
        } else {
          _Item_Store_Store.setListState({ list: [..._Item_Store_Store.list, ...data.data.list] })
        }
      }
    }
  }, [data])

  return <>
    <div className="p-2">

      <div className="flex justify-end gap-2 items-center mb-2">
        <Button
          disabled={_Item_Store_Store.listing ? true : false}
          variant={'secondary'}
          onClick={async () => {
            _Item_Store_Store.setListState({
              pagination: null
            })
            await refetch()
          }}
        >
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

      {/* <NameComponentTable_
        isError={false}
        isLoading={_Item_Store_Store.listing}
        list={_Item_Store_Store.list}
        handleDelete={(id, item) => {
          _Item_Store_Store.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          _Item_Store_Store.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}
      <NameComponentTable />
    </div>
    <DialogCreateNameComponent />
    <DialogUpdateNameComponent />
    <DialogConfirmDelete />
  </>
}

// #region table 
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
const ActionsRow = ({ data }: { data: CellContext<name_entityDTO, unknown> }) => {
  const item = data.row.original;
  const _Item_Store_Store = use_Item_Store_Store();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          _Item_Store_Store.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", item.id)
          _Item_Store_Store.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

type NameComponentTableProps = {

}

export const NameComponentTable = ({ }: NameComponentTableProps) => {
  const _Item_Store_Store = use_Item_Store_Store();
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
        return (<ActionsRow data={data} />)
      }
    }
  ];

  const table = useReactTable({
    data: _Item_Store_Store.list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel(),

    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id, // recomendado
  });


  return <>
    {_Item_Store_Store.list.length > 0 && (<>
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
// #endregion table 

// #region diaglogs
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
  const createItem = UseCreateEntityNameAction(_Item_Store_Store.pagination?.page || null)

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
    _Item_Store_Store.setCreateState({ creating: true })
    const req = await createItem.mutateAsync({
      name: data.name
    })
    _Item_Store_Store.setCreateState({ creating: false, openCreate: false })
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
  const updateItem = UseUpdateEntityNameAction(_Item_Store_Store.pagination?.page || null)

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
    _Item_Store_Store.setUpdateState({ updating: true })
    await updateItem.mutateAsync({
      id: currentOpened.id || '',
      name: data.name
    })
    _Item_Store_Store.setUpdateState({ updating: false, openUpdate: false })
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
  const deleteItem = UseDeleteEntityNameAction(_Item_Store_Store.pagination?.page || null)

  const HandleToDelete = async () => {
    if (!_Item_Store_Store.currentElementSelected) return;
    _Item_Store_Store.setDeleteState({ deleting: true })
    await deleteItem.mutateAsync({ id: _Item_Store_Store.currentElementSelected || '' })
    _Item_Store_Store.setDeleteState({ deleting: false, openDelete: false })
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
// #endregion diaglogs

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

/*
  "scratch_identity"
*/
// #region Hooks 
//___________ hooks 
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateEntityNameAction = (page: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Createname_entity,
    onSuccess: (response) => {
      if (!response) {
        toast.error('Error "req" no encontrado')
        return;
      }

      if (!response?.status) {
        toast.error('Error, consulta fallida')
        return;
      }

      if (!response?.data) {
        toast.error('Error "req" no encontrado')
        return;
      }

      const newItem = response.data.property_entity;

      toast.success('Item creado')

      queryClient.setQueryData(
        ["scratch_identity", page],
        (oldData: any) => {
          console.log(oldData)
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: [
                newItem,
                ...oldData.data.list
              ]
            }
          };
        }
      );
    },
    onError: (error) => {
      console.log(error.message)
      toast.error('Error inesperado, intentalo más tarde.')
    }
  });
};


export const UseDeleteEntityNameAction = (page: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: Deletename_entity,
    onSuccess: (response) => {
      if (!response) {
        toast.error('Error "req" no encontrado')
        return;
      }

      if (!response?.status) {
        toast.error('Error, consulta fallida')
        return;
      }

      if (!response?.data) {
        toast.error('Error "req" no encontrado')
        return;
      }

      toast.success('Item eliminado')

      const deletedId = response.data.id;

      queryClient.setQueryData(
        ["scratch_identity", page],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.filter(
                (item: any) => item.id !== deletedId
              )
            }
          };
        }
      );
    },
    onError: () => {
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};


export const UseUpdateEntityNameAction = (page: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Updatename_entity,
    onSuccess: (response) => {
      if (!response) {
        toast.error('Error "req" no encontrado')
        return;
      }

      if (!response?.status) {
        toast.error('Error, consulta fallida')
        return;
      }

      if (!response?.data) {
        toast.error('Error "req" no encontrado')
        return;
      }

      toast.success('Item actualizado')

      const updatedItem = response.data.property_entity;
      queryClient.setQueryData(
        ["scratch_identity", page],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.map((item: any) =>
                item.id === updatedItem?.id
                  ? updatedItem
                  : item
              )
            }
          };
        }
      );
    },
    onError: () => {
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};

export const UselistEntityNameAction = (
  page: number | null,
) => {
  return useQuery({
    queryKey: ["scratch_identity", page],
    queryFn: () => {
      return Getname_entity({
        page: page || 1
      })
    },
    // maxPages: 1000,
    // enabled: true, // si tienes un modal lo puedes usar para que liste al momento  abrirlo,
    // placeholderData: (previousData) => previousData, // Evita que la tabla parpadee al cambiar página.
    // retry: 3,
    // refetchOnWindowFocus: true,
    // gcTime: 1000 * 60 * 30, // Antes llamado cacheTime. (30 minutos de memoria)
    // staleTime: 1000 * 60 * 5, // Por defecto React Query considera los datos viejos inmediatamente. (5 minutos frescos)
  });
};
// #endregion Hooks 

/*
  _Item_Store_
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

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
import { ResponsePagination } from "@/types/api/utils.pagination"

export const Getname_entity = async (data: Getname_entitysRequestDTO): Promise<ResponseApi<Getname_entitysResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/entity_api?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const Updatename_entity = async (data: Updatename_entityRequestDTO): Promise<ResponseApi<Updatename_entityResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/entity_api/${data.id}`, data);
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
  id: string;
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