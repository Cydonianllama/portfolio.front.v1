'use client'
/*
  Members
*/

/*
  Members
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData"
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

type MembersProps = {

}

export const MembersSection_ = ({ }: MembersProps) => {
  const MembersStore = useMembersStore();
  const useMembersActions = UseMembersActions({})

  const InitialList = () => {
    useMembersActions.listMembersAction({ page: 1 })
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
        <Button disabled={MembersStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { MembersStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      {/* <MembersList_
        isError={false}
        isLoading={MembersStore.listing}
        list={MembersStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          MembersStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          MembersStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <MembersTable_
        isError={false}
        isLoading={MembersStore.listing}
        list={MembersStore.list}
        handleDelete={(id, item) => {
          MembersStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          MembersStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <MembersFooterTable
        HandleToNextPage={() => {
          if (!MembersStore.pagination) return;
          MembersStore.setListState({
            pagination: {
              ...MembersStore.pagination,
              page: MembersStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!MembersStore.pagination) return;
          MembersStore.setListState({
            pagination: {
              ...MembersStore.pagination,
              page: MembersStore.pagination?.page - 1,
            }
          })
        }}
        pagination={MembersStore.pagination}
      />
    </div>

    <DialogCreateMembers />
    <DialogUpdateMembers />
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

type MembersTableProps = {
  handleEdit: (id: string, data: MemberDTO) => void
  handleDelete: (id: string, data: MemberDTO) => void
  list: Array<MemberDTO>
  isLoading: boolean
  isError: boolean
}

export const MembersTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: MembersTableProps) => {
  // const MembersStore = useMembersStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<MemberDTO>[] = [
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
  data: CellContext<MemberDTO, unknown>
  handleEdit: (id: string, data: MemberDTO) => void
  handleDelete: (id: string, data: MemberDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const MembersStore = useMembersStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // MembersStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
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
          // MembersStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
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

export type MembersFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const MembersFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: MembersFooterTableProps) => {
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

type DialogCreateMembersProps = {

}

const DialogCreateMembers = ({ }: DialogCreateMembersProps) => {
  const useAppData = UseAppData()
  const MembersStore = useMembersStore();
  const useMembersActions = UseMembersActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationMembersSchema>({
    resolver: zodResolver(creationMembersSchema),
  });

  useEffect(() => {
    if (!MembersStore.openCreate) {
      reset({
        email: '',
        rolId: '',
      });
    }
  }, [MembersStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationMembersSchema) => {
    await useMembersActions.createMembersAction({
      email: data.email || '',
      rolId: data.rolId || '',
      workspaceId: useAppData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={MembersStore.openCreate} onOpenChange={(open) => { MembersStore.setCreateState({ openCreate: open }) }} >
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
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Rol</Label>
            <Input
              placeholder="Rol"
              {...register("rolId")}
            />
            {errors.rolId && (
              <p className="text-sm text-red-500">
                {errors.rolId.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {MembersStore.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateMembersProps = {

}

const DialogUpdateMembers = ({ }: DialogUpdateMembersProps) => {
  const useAppData = UseAppData()
  const MembersStore = useMembersStore();
  const useMembersActions = UseMembersActions({})

  const currentOpened = MembersStore.list.find(el => MembersStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateMembersSchema>({
    resolver: zodResolver(updateMembersSchema),
  });

  useEffect(() => {
    if (!MembersStore.openUpdate) {
      reset({
        rolId: '',
        status: 0,
      });
    }

    if (currentOpened) {
      reset({
        rolId: currentOpened.rolId,
        status: currentOpened.status as MemberStatus || MemberStatus.disabled
      })
    }


  }, [MembersStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateMembersSchema) => {
    if (!currentOpened) return;
    await useMembersActions.updateMembersAction(currentOpened.id, {
      rolId: data.rolId || '',
      status: data.status || 0,
      workspaceId: useAppData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={MembersStore.openUpdate} onOpenChange={(open) => { MembersStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar item</DialogTitle>
          <DialogDescription>
            Actualización de item
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Rol</Label>
            <Input
              placeholder="Rol"
              {...register("rolId")}
            />
            {errors.rolId && (
              <p className="text-sm text-red-500">
                {errors.rolId.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Status</Label>
            <Input
              placeholder="status"
              {...register("status")}
            />
            {errors.status && (
              <p className="text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {MembersStore.updating && <Spinner data-icon="inline-start" />}
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
  const MembersStore = useMembersStore();
  const useMembersActions = UseMembersActions({})

  const HandleToDelete = () => {
    if (!MembersStore.currentElementSelected) return;
    useMembersActions.deleteMembersAction({ id: MembersStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={MembersStore.openDelete} onOpenChange={(open) => { MembersStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={MembersStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {MembersStore.deleting && <Spinner data-icon="inline-start" />}
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

export const creationMembersSchema = z.object({
  email: z.string().trim(),
  rolId: z.string().trim(),
});

export type CreationMembersSchema = z.infer<typeof creationMembersSchema>;

// update schema

export const updateMembersSchema = z.object({
  rolId: z.string().trim().nullish(),
  status: z.number().nullish(),
});

export type UpdateMembersSchema = z.infer<typeof updateMembersSchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseMembersActionsProps = {

}

export const UseMembersActions = ({ }: UseMembersActionsProps) => {
  const MembersStore = useMembersStore();

  const createMembersAction = useCallback(async (data: CreateMemberRequestDTO) => {
    try {
      MembersStore.setCreateState({ creating: true })
      const reqCreation = await CreateMember(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.member && reqCreation.status) {
        const list = [reqCreation?.data.member, ...MembersStore.list]
        MembersStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      MembersStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [MembersStore.list])

  const updateMembersAction = useCallback(async (id: string, data: UpdateMemberRequestDTO) => {
    try {
      MembersStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateMember(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.member) {
        let list = [...MembersStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.member || el
          } else {
            return el;
          }
        })
        MembersStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      MembersStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [MembersStore.list])

  const listMembersAction = useCallback(async (data: GetMembersRequestDTO) => {
    try {
      MembersStore.setListState({ listing: true })

      if (data.page == 1) {
        MembersStore.setListState({ list: [] })
      }

      const reqList = await GetMember(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        MembersStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          MembersStore.setListState({ list: reqList.data.list })
        } else {
          MembersStore.setListState({ list: [...MembersStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      MembersStore.setListState({ listing: false })
    }
  }, [])

  const deleteMembersAction = useCallback(async (data: DeleteMemberRequestDTO) => {
    try {
      MembersStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteMember(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...MembersStore.list]
        list = list.filter(el => el.id != data.id)
        MembersStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      MembersStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [MembersStore.list])

  return {
    createMembersAction,
    updateMembersAction,
    listMembersAction,
    deleteMembersAction,
  }
}
// #endregion Hooks

/*
  Members
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface MembersStore {
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
  list: Array<MemberDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<MemberDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useMembersStore = create<MembersStore>((set) => ({
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
/api/members
Member
member
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';

export const GetMember = async (data: GetMembersRequestDTO): Promise<ResponseApi<GetMembersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/members?page=${data.page}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateMember = async (id: string, data: UpdateMemberRequestDTO): Promise<ResponseApi<UpdateMemberResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/members/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateMember = async (data: CreateMemberRequestDTO): Promise<ResponseApi<CreateMemberResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/members`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteMember = async (data: DeleteMemberRequestDTO): Promise<ResponseApi<DeleteMemberResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/members/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export enum MemberStatus {
  pending = 1,
  active = 2,
  rejected = 3,
  disabled = 4,
}

export interface MemberDTO {
  id: string;
  email: string
  workspaceId: string
  rolId: string
  creationDate: Date
  isOwner: boolean
  status: MemberStatus,
  invitation: {
    accepted: boolean,
    acceptedDate: Date
  } | null
}

// get one
export interface GetMemberRequestDTO {
  id: string;
}

export interface GetMemberResponseDTO {
  member: MemberDTO | null
}

// get many
export interface GetMembersRequestDTO {
  page: number
}

export interface GetMembersResponseDTO {
  list: Array<MemberDTO>
}

// update one
export interface UpdateMemberRequestDTO {
  rolId: string;
  status: number;
  workspaceId: string;
}

export interface UpdateMemberResponseDTO {
  member: MemberDTO | null
}

// delete one
export interface DeleteMemberRequestDTO {
  id: string
}

export interface DeleteMemberResponseDTO {
  id: string
}

// create one
export interface CreateMemberRequestDTO {
  email: string;
  rolId: string;
  workspaceId: string;
}

export interface CreateMemberResponseDTO {
  member: MemberDTO | null
}
// #endregion API