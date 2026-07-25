'use client'
/*
  EntityName
*/

/*
  Automation
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
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
import { MdOutlineEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
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

type AutomationProps = {

}

export const AutomationSection = ({ }: AutomationProps) => {
  const AutomationStore = useAutomationStore();
  const useEntityNameActions = UseEntityNameActions({})
  const useAppData = UseAppData()
  const automationTestStore = useAutomationTest()

  const InitialList = () => {
    useEntityNameActions.listEntityNameAction({ page: 1, workspaceId: useAppData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (useAppData.workspace?.id) OnInit()
  }, [useAppData.workspace?.id])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={AutomationStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button variant={'outline'} onClick={() => { automationTestStore.setState({ openChat: true }) }}> 
          <RiChatSettingsLine />
          Chat de test
        </Button>
        <Button onClick={() => { AutomationStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      {/* <AutomationList_
        isError={false}
        isLoading={AutomationStore.listing}
        list={AutomationStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          AutomationStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          AutomationStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <AutomationTable_
        isError={false}
        isLoading={AutomationStore.listing}
        list={AutomationStore.list}
        handleDelete={(id, item) => {
          AutomationStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          AutomationStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <AutomationFooterTable
        HandleToNextPage={() => {
          if (!AutomationStore.pagination) return;
          AutomationStore.setListState({
            pagination: {
              ...AutomationStore.pagination,
              page: AutomationStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!AutomationStore.pagination) return;
          AutomationStore.setListState({
            pagination: {
              ...AutomationStore.pagination,
              page: AutomationStore.pagination?.page - 1,
            }
          })
        }}
        pagination={AutomationStore.pagination}
      />
    </div>

    <DialogCreateAutomation />
    <DialogUpdateAutomation />
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

type AutomationTableProps = {
  handleEdit: (id: string, data: AutomationDTO) => void
  handleDelete: (id: string, data: AutomationDTO) => void
  list: Array<AutomationDTO>
  isLoading: boolean
  isError: boolean
}

export const AutomationTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: AutomationTableProps) => {
  // const AutomationStore = useAutomationStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<AutomationDTO>[] = [
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
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => (<>
        <ShowcaseId id={row.original.id || ''}  />
      </>)
    },
    {
      accessorKey: "title",
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
        <div className="border rounded-lg overflow-hidden flex-1">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group, headerIdx) => (
                <TableRow key={headerIdx}>
                  {group.headers.map((header, index) => (
                    <TableHead className={`${(index == group.headers.length - 1) ? 'text-end' : ''} text-foreground bg-mist-50 py-1`} key={index}>
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
                    <TableCell className={`${(cellIdx == row.getVisibleCells().length - 1) ? 'flex justify-end' : ''} text-muted-foreground py-1`} key={cellIdx}>
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
          description="Usted no cuenta con automatizaciones."
          title="Automatizaciones"
          isActiveCreate
          isActiveImport={false}
          isActiveLearn={false}
          onClickCreate={() => { }}
          textButtonCreate={'Agregar automatización'}
          mainIcon={<MdOutlineLabel />}
        />
      </>)}
    </>)}

  </>
}

//--
// ActionsRow
import { useRouter } from 'next/navigation'
type ActionsRowProps = {
  data: CellContext<AutomationDTO, unknown>
  handleEdit: (id: string, data: AutomationDTO) => void
  handleDelete: (id: string, data: AutomationDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  const router = useRouter()
  // const AutomationStore = useAutomationStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // AutomationStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
          handleEdit(item.id, item)
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          router.push(`/automation/${item.id}`)
        }}
      >
        <MdOutlineRemoveRedEye />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", item.id)
          // AutomationStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
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

export type AutomationFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const AutomationFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: AutomationFooterTableProps) => {
  return (<>
    <div className='flex justify-between items-center py-4 text-xs'>
      <div className="text-muted-foreground">{((pagination?.page || 0) - 1) * (pagination?.limit || 0)}-{((pagination?.page || 0) - 1) * (pagination?.limit || 0) + (pagination?.limit || 0)} de <strong>{pagination?.total || 0}</strong></div>
      <div className='flex gap-5 items-center'>
        <Button
          className={'text-muted-foreground'}
          size={'icon-xs'}
          variant="outline"
          onClick={HandleToPrevPage}
          disabled={pagination?.hasPreviousPage ? false : true}
        >
          <FaChevronLeft />
        </Button>
        <span className="text-muted-foreground">{pagination?.page}/{pagination?.totalPages}</span>
        <Button
          className={'text-muted-foreground'}
          onClick={HandleToNextPage}
          size={'icon-xs'}
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

type DialogCreateAutomationProps = {

}

const DialogCreateAutomation = ({ }: DialogCreateAutomationProps) => {
  const useAppData = UseAppData()

  const AutomationStore = useAutomationStore();
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
  });

  useEffect(() => {
    if (!AutomationStore.openCreate) {
      reset({
        title: '',
      });
    }
  }, [AutomationStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationEntityNameSchema) => {
    await useEntityNameActions.createEntityNameAction({
      title: data.title,
      workspaceId: useAppData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={AutomationStore.openCreate} onOpenChange={(open) => { AutomationStore.setCreateState({ openCreate: open }) }} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Automatización</DialogTitle>
          <DialogDescription>
            Creación una nueva automatización
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
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {AutomationStore.creating && <Spinner data-icon="inline-start" />}
            Crear automatización
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

type DialogUpdateAutomationProps = {

}

const DialogUpdateAutomation = ({ }: DialogUpdateAutomationProps) => {
  const AutomationStore = useAutomationStore();
  const useEntityNameActions = UseEntityNameActions({})

  const currentOpened = AutomationStore.list.find(el => AutomationStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateEntityNameSchema>({
    resolver: zodResolver(updateEntityNameSchema),
  });

  useEffect(() => {
    if (!AutomationStore.openUpdate) {
      reset({
        title: '',
      });
    }

    if (currentOpened) {
      reset({
        title: currentOpened.title,
      })
    }


  }, [AutomationStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateEntityNameSchema) => {
    if (!currentOpened) return;
    await useEntityNameActions.updateEntityNameAction(currentOpened.id, {
      title: data.title,
      id: currentOpened.id || ''
    })
  }
  return <>
    <Dialog open={AutomationStore.openUpdate} onOpenChange={(open) => { AutomationStore.setUpdateState({ openUpdate: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Actualizar automatización</DialogTitle>
          <DialogDescription>
            Actualización de automatización.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Nombre</Label>
            <Input
              placeholder="name"
              {...register("title")}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {AutomationStore.updating && <Spinner data-icon="inline-start" />}
            Actualizar automatización
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
  const AutomationStore = useAutomationStore();
  const useEntityNameActions = UseEntityNameActions({})

  const HandleToDelete = () => {
    if (!AutomationStore.currentElementSelected) return;
    useEntityNameActions.deleteEntityNameAction({ id: AutomationStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={AutomationStore.openDelete} onOpenChange={(open) => { AutomationStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={AutomationStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {AutomationStore.deleting && <Spinner data-icon="inline-start" />}
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
  title: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationEntityNameSchema = z.infer<typeof creationEntityNameSchema>;

// update schema

export const updateEntityNameSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
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
  const AutomationStore = useAutomationStore();

  const createEntityNameAction = useCallback(async (data: CreateAutomationRequestDTO) => {
    try {
      AutomationStore.setCreateState({ creating: true })
      const reqCreation = await CreateAutomation(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.automation && reqCreation.status) {
        const list = [reqCreation?.data.automation, ...AutomationStore.list]
        AutomationStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      AutomationStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [AutomationStore.list])

  const updateEntityNameAction = useCallback(async (id: string, data: UpdateAutomationRequestDTO) => {
    try {
      AutomationStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateAutomation(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.automation) {
        let list = [...AutomationStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.automation || el
          } else {
            return el;
          }
        })
        AutomationStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      AutomationStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [AutomationStore.list])

  const listEntityNameAction = useCallback(async (data: GetAutomationsRequestDTO) => {
    try {
      AutomationStore.setListState({ listing: true })

      if (data.page == 1) {
        AutomationStore.setListState({ list: [] })
      }

      const reqList = await GetAutomation(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        AutomationStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          AutomationStore.setListState({ list: reqList.data.list })
        } else {
          AutomationStore.setListState({ list: [...AutomationStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      AutomationStore.setListState({ listing: false })
    }
  }, [])

  const deleteEntityNameAction = useCallback(async (data: DeleteAutomationRequestDTO) => {
    try {
      AutomationStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteAutomation(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...AutomationStore.list]
        list = list.filter(el => el.id != data.id)
        AutomationStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      AutomationStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [AutomationStore.list])

  return {
    createEntityNameAction,
    updateEntityNameAction,
    listEntityNameAction,
    deleteEntityNameAction,
  }
}
// #endregion Hooks

/*
  Automation
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface AutomationStore {
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
  list: Array<AutomationDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<AutomationDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useAutomationStore = create<AutomationStore>((set) => ({
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
/api/automations
Automation
automation
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'
import { ShowcaseId } from "@/components/cydocompos";
import { RiChatSettingsLine } from "react-icons/ri";
import { useAutomationTest } from "../automation-test/store/automation.test.store";

export const GetAutomation = async (data: GetAutomationsRequestDTO): Promise<ResponseApi<GetAutomationsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/automations?page=${data.page}&workspaceId=${data.workspaceId}`);
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


export const UpdateAutomation = async (id: string, data: UpdateAutomationRequestDTO): Promise<ResponseApi<UpdateAutomationResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/automations/${id}`, data);
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

export const CreateAutomation = async (data: CreateAutomationRequestDTO): Promise<ResponseApi<CreateAutomationResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/automations`, data);
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

export const DeleteAutomation = async (data: DeleteAutomationRequestDTO): Promise<ResponseApi<DeleteAutomationResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/automations/${data.id}`);
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

export interface AutomationDTO {
  id: string;
  title: string;
}

// get one
export interface GetAutomationRequestDTO {
  id: string;
}

export interface GetAutomationResponseDTO {
  automation: AutomationDTO | null
}

// get many
export interface GetAutomationsRequestDTO {
  workspaceId: string;
  page: number
}

export interface GetAutomationsResponseDTO {
  list: Array<AutomationDTO>
}

// update one
export interface UpdateAutomationRequestDTO {
  title: string;
  id: string
}

export interface UpdateAutomationResponseDTO {
  automation: AutomationDTO | null
}

// delete one
export interface DeleteAutomationRequestDTO {
  id: string
}

export interface DeleteAutomationResponseDTO {
  id: string
}

// create one
export interface CreateAutomationRequestDTO {
  title: string;
  workspaceId: string
}

export interface CreateAutomationResponseDTO {
  automation: AutomationDTO | null
}
// #endregion API


type scratch_withouttanstackProps = {
  
}
