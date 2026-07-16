'use client'
/*
  Folder
*/

/*
  Folder
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

type FolderProps = {

}

export const FolderSection = ({ }: FolderProps) => {
  const useAppData = UseAppData()
  const FolderStore = useFolderStore();
  const useFolderActions = UseFolderActions({})

  const InitialList = () => {
    useFolderActions.listFolderAction({ page: 1, workspaceId: useAppData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (useAppData.workspace) OnInit()
  }, [useAppData.workspace])

  return <>
    <div className="p-2">

      <div className="flex justify-between gap-2 items-center mb-2">
        <h1 className="text-lg font-semibold flex gap-1 items-center">
          <span><TiFolderOpen /></span>
          <span>Folders</span>
        </h1>
        <div>
          {/* <Button disabled={FolderStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { FolderStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button> */}
        </div>
      </div>

      <FolderList_
        isError={false}
        isLoading={FolderStore.listing}
        list={FolderStore.list}
        HandleDragEndEvent={() => { }}
        onClickDelete={(id, item) => {
          FolderStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          FolderStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />


      {/* <FolderFooterTable
        HandleToNextPage={() => {
          if (!FolderStore.pagination) return;
          FolderStore.setListState({
            pagination: {
              ...FolderStore.pagination,
              page: FolderStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!FolderStore.pagination) return;
          FolderStore.setListState({
            pagination: {
              ...FolderStore.pagination,
              page: FolderStore.pagination?.page - 1,
            }
          })
        }}
        pagination={FolderStore.pagination}
      /> */}
    </div>

    <DialogCreateFolder />
    <DialogUpdateFolder />
    <DialogConfirmDelete />
  </>
}

// #region tabletemp

//
// START::STYLELIST
//

//-----
//import { useState } from "react";
// components
import { MdOutlineLabel } from "react-icons/md";
// import {
//   Item,
//   ItemActions,
//   ItemContent,
//   ItemDescription,
//   ItemGroup,
//   ItemMedia,
//   ItemTitle,
// } from "@/components/ui/item"
// sort
// import {
//   DndContext,
//   closestCenter,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { EmptyStateComponent } from "@/components/Empty";
// import { SpinnerListing } from "@/components/Listing";
// import { ErrorStateComponent } from "@/components/Error";
// import { ResponsePagination } from "@/types/api/utils.pagination";

type FolderListProps = {
  list: Array<FolderDTO>,
  isLoading: boolean
  isError: boolean
  HandleDragEndEvent?: (event: DragEndEvent) => void;
  onClickEdit?: (id: string, item: FolderDTO) => void
  onClickDelete?: (id: string, item: FolderDTO) => void
}

export const FolderList_ = ({ isLoading, isError, list, HandleDragEndEvent, onClickDelete, onClickEdit }: FolderListProps) => {
  const FolderStore = useFolderStore();

  const handleDragEndEvent = (event: DragEndEvent) => {
    if (HandleDragEndEvent) HandleDragEndEvent(event)
  }

  return (<>
    <section>
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
          <ItemGroup className="flex flex-row flex-wrap items-center">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndEvent}
            >
              <SortableContext
                items={list}
                strategy={horizontalListSortingStrategy}
              >
                {list.map((item, idx) => (<SortableItem id={item.id} data={item} key={idx} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />))}
                <Button variant={'outline'} onClick={() => { FolderStore.setCreateState({ openCreate: true }) }}>
                  <GoPlus />
                  Crear Item
                </Button>
              </SortableContext>
            </DndContext>
          </ItemGroup>
        </>)}

        {list.length == 0 && (<>
          {/* <EmptyStateComponent
            description="Usted no cuenta con items."
            title="Items"
            isActiveCreate
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => { }}
            textButtonCreate={'Agregar item'}
            mainIcon={<MdOutlineLabel />}
          /> */}
          <div>
            <div className="p-2 border-dotted flex justify-center items-center">No tienes carpetas registradas</div>
          </div>
        </>)}

      </>)}

    </section>

  </>)
}

//-----
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
// import { useState } from "react";
// components
// import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// icons
import { LuDot } from "react-icons/lu";
import { PencilIcon, TrashIcon } from "lucide-react"
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

// sort
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type colorsSelector = {
  name: string,
  code: string,
  classname: string
}

export const ColorsSelector: Array<colorsSelector> = [
  {
    code: 'color::default',
    name: 'Default',
    classname: 'bg-gray-500'
  },
  {
    code: 'color::green',
    name: 'Verde',
    classname: 'bg-green-500'
  },
  {
    code: 'color::red',
    name: 'Rojo',
    classname: 'bg-red-500'
  },
  {
    code: 'color::blue',
    name: 'Azul',
    classname: 'bg-blue-500'
  },
  {
    code: 'color::yellow',
    name: 'Amarillo',
    classname: 'bg-yellow-500'
  },
]

//
// ITEM
//

interface SortableItemProps {
  id: string;
  data: FolderDTO
  onClickEdit?: (id: string, item: FolderDTO) => void
  onClickDelete?: (id: string, item: FolderDTO) => void
}

export const SortableItem = ({ id, data, onClickDelete, onClickEdit }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // padding: "12px",
    // border: "1px solid #ccc",
    // borderRadius: "8px",
    // marginBottom: "8px",
    // background: "white",
    cursor: "grab",
  };

  //
  //
  //

  const HandleClickEdit = (id: string, item: FolderDTO) => {
    if (onClickEdit) onClickEdit(id, item)
  }

  const HandleClickDelete = (id: string, item: FolderDTO) => {
    if (onClickDelete) onClickDelete(id, item)
  }

  return (
    <Item
      size={'xs'}
      ref={setNodeRef}
      style={style}

      className="bg-gray-50 w-fit"
      variant="outline"
    >
      <ItemMedia
        {...attributes}
        {...listeners}
        variant="icon"
      >
        <TiFolderOpen />
        {/* <PiDotsSixVerticalBold /> */}
      </ItemMedia>
      <ItemContent>

        <div className="flex items-center gap-1.5">
          <ItemTitle className="font-semibold">
            {data.name}
          </ItemTitle>
          {/* <LuDot /> */}
        </div>
        {/* <ItemDescription>
          A simple item with title and description.
        </ItemDescription> */}
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size={'icon'}><BiDotsHorizontalRounded /></Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {
                HandleClickEdit(id, data)
              }}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <ShareIcon />
                Share
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={() => {
                HandleClickDelete(id, data)
              }}>
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

// components
//import { Button } from '@/components/ui/button'
//import { ResponsePagination } from '@/types/api/utils.pagination';

// icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export type FolderFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const FolderFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: FolderFooterTableProps) => {
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
// END::STYLELIST
//

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

type DialogCreateFolderProps = {

}

const DialogCreateFolder = ({ }: DialogCreateFolderProps) => {
  const useAppData = UseAppData()
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
      name: data.name,
      module: 'variables',
      workspaceId: useAppData.workspace?.id || ''
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
  const useAppData = UseAppData()
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
    await useFolderActions.updateFolderAction(currentOpened.id, {
      name: data.name,
      workspaceId: useAppData.workspace?.id || ''
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
// #endregion dialogs

// #endregion Components

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
// #endregion Schemas

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
        FolderStore.setListState({ pagination: reqList.pagination || null })
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
  }, [])

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
// #endregion Hooks

/*
  Folder
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface FolderStore {
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
  list: Array<FolderDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<FolderDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
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
/api/folders
Folder
folder
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { TiFolderOpen } from "react-icons/ti"
import { GoPlus } from "react-icons/go"

export const GetFolder = async (data: GetFoldersRequestDTO): Promise<ResponseApi<GetFoldersResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/folders?page=${data.page}&workspaceId=${data.workspaceId}`);
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
  name: string;
  module: string;
  creationDate: Date;
  workspaceId: string;
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
  page: number,
  workspaceId: string
}

export interface GetFoldersResponseDTO {
  list: Array<FolderDTO>
}

// update one
export interface UpdateFolderRequestDTO {
  name: string;
  workspaceId: string;
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
  module: string;
  workspaceId: string;
}

export interface CreateFolderResponseDTO {
  folder: FolderDTO | null
}
// #endregion API