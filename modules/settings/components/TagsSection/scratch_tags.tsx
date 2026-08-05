'use client'
/*
  Tag
*/

/*
  Tag
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
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

type TagProps = {

}

export const TagSection = ({ }: TagProps) => {
  const appData = useAppData()
  const TagStore = useTagStore();
  const useTagActions = UseTagActions({})

  const InitialList = () => {
    useTagActions.listTagAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (appData.workspace) OnInit()
  }, [appData.workspace])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={TagStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { TagStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      <TagList_
        isError={false}
        isLoading={TagStore.listing}
        list={TagStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          TagStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          TagStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <TagFooterTable
        HandleToNextPage={() => {
          if (!TagStore.pagination) return;
          TagStore.setListState({
            pagination: {
              ...TagStore.pagination,
              page: TagStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!TagStore.pagination) return;
          TagStore.setListState({
            pagination: {
              ...TagStore.pagination,
              page: TagStore.pagination?.page - 1,
            }
          })
        }}
        pagination={TagStore.pagination}
      />
    </div>

    <DialogCreateTag />
    <DialogUpdateTag />
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

type TagListProps = {
  list: Array<TagDTO>,
  isLoading: boolean
  isError: boolean
  HandleDragEndEvent?: (event: DragEndEvent) => void;
  onClickEdit?: (id: string, item: TagDTO) => void
  onClickDelete?: (id: string, item: TagDTO) => void
}

export const TagList_ = ({ isLoading, isError, list, HandleDragEndEvent, onClickDelete, onClickEdit }: TagListProps) => {

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
          <ItemGroup >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndEvent}
            >
              <SortableContext
                items={list}
                strategy={verticalListSortingStrategy}
              >
                {list.map((item, idx) => (<SortableItem id={item.id}  data={item} key={idx} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />))}
              </SortableContext>
            </DndContext>
          </ItemGroup>
        </>)}

        {list.length == 0 && (<>
          <EmptyStateComponent
            description="Usted no cuenta con items."
            title="Items"
            isActiveCreate
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => {}}
            textButtonCreate={'Agregar item'}
            mainIcon={<MdOutlineLabel/>}
          />
        </>)}

      </>)}

    </section>

  </>)
}

//-----
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
// components
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
  data: TagDTO
  onClickEdit?: (id: string, item: TagDTO) => void
  onClickDelete?: (id: string, item: TagDTO) => void
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

  const HandleClickEdit = (id: string, item: TagDTO) => {
    if (onClickEdit) onClickEdit(id, item)
  }

  const HandleClickDelete = (id: string, item: TagDTO) => {
    if (onClickDelete) onClickDelete(id, item)
  }

  return (
    <Item
      size={'xs'}
      ref={setNodeRef}
      style={style}

      className="bg-gray-50"
      variant="outline"
    >
      <ItemMedia
        {...attributes}
        {...listeners}
        variant="icon"
      >
        <PiDotsSixVerticalBold />
      </ItemMedia>
      <ItemContent>

        <div className="flex items-center gap-1.5">
          <ItemTitle className="font-semibold">
            {/* <div className={`h-2 w-2 rounded-full ${ColorsSelector.find(el => el.code == data.color)?.classname || 'bg-gray-500'}`}></div> */}
            {data.name}
          </ItemTitle>
          <LuDot />
          <span className="text-gray-500">x registros</span>
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

export type TagFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const TagFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: TagFooterTableProps) => {
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

type DialogCreateTagProps = {

}

const DialogCreateTag = ({ }: DialogCreateTagProps) => {
  const TagStore = useTagStore();
  const useTagActions = UseTagActions({})

  const appData = useAppData()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationTagSchema>({
    resolver: zodResolver(creationTagSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!TagStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [TagStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationTagSchema) => {
    await useTagActions.createTagAction({
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }

  return <>
    <Dialog open={TagStore.openCreate} onOpenChange={(open) => { TagStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={TagStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {TagStore.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateTagProps = {

}

const DialogUpdateTag = ({ }: DialogUpdateTagProps) => {
  const appData = useAppData()
  const TagStore = useTagStore();
  const useTagActions = UseTagActions({})

  const currentOpened = TagStore.list.find(el => TagStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateTagSchema>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!TagStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [TagStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateTagSchema) => {
    if (!currentOpened) return;
    await useTagActions.updateTagAction(currentOpened.id, {
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={TagStore.openUpdate} onOpenChange={(open) => { TagStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={TagStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {TagStore.updating && <Spinner data-icon="inline-start" />}
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
  const appData = useAppData()
  const TagStore = useTagStore();
  const useTagActions = UseTagActions({})

  const HandleToDelete = () => {
    if (!TagStore.currentElementSelected) return;
    useTagActions.deleteTagAction({ id: TagStore.currentElementSelected || '', workspaceId: appData.workspace?.id || '' })
  }

  return <>
    <Dialog open={TagStore.openDelete} onOpenChange={(open) => { TagStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={TagStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {TagStore.deleting && <Spinner data-icon="inline-start" />}
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

export const creationTagSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationTagSchema = z.infer<typeof creationTagSchema>;

// update schema

export const updateTagSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateTagSchema = z.infer<typeof updateTagSchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseTagActionsProps = {

}

export const UseTagActions = ({ }: UseTagActionsProps) => {
  const TagStore = useTagStore();

  const createTagAction = useCallback(async (data: CreateTagRequestDTO) => {
    try {
      TagStore.setCreateState({ creating: true })
      const reqCreation = await CreateTag(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.tag && reqCreation.status) {
        const list = [reqCreation?.data.tag, ...TagStore.list]
        TagStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      TagStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [TagStore.list])

  const updateTagAction = useCallback(async (id: string, data: UpdateTagRequestDTO) => {
    try {
      TagStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateTag(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.tag) {
        let list = [...TagStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.tag || el
          } else {
            return el;
          }
        })
        TagStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      TagStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [TagStore.list])

  const listTagAction = useCallback(async (data: GetTagsRequestDTO) => {
    try {
      TagStore.setListState({ listing: true })

      if (data.page == 1) {
        TagStore.setListState({ list: [] })
      }

      const reqList = await GetTag(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        TagStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          TagStore.setListState({ list: reqList.data.list })
        } else {
          TagStore.setListState({ list: [...TagStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      TagStore.setListState({ listing: false })
    }
  }, [])

  const deleteTagAction = useCallback(async (data: DeleteTagRequestDTO) => {
    try {
      TagStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteTag(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...TagStore.list]
        list = list.filter(el => el.id != data.id)
        TagStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      TagStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [TagStore.list])

  return {
    createTagAction,
    updateTagAction,
    listTagAction,
    deleteTagAction,
  }
}
// #endregion Hooks

/*
  Tag
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface TagStore {
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
  list: Array<TagDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<TagDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useTagStore = create<TagStore>((set) => ({
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
/api/tags
Tag
tag
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import axios from 'axios'

export const GetTag = async (data: GetTagsRequestDTO): Promise<ResponseApi<GetTagsResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/workspaces/${data.workspaceId}/tags?page=${data.page}`);
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


export const UpdateTag = async (id: string, data: UpdateTagRequestDTO): Promise<ResponseApi<UpdateTagResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/workspaces/${data.workspaceId}/tags/${id}`, data);
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

export const CreateTag = async (data: CreateTagRequestDTO): Promise<ResponseApi<CreateTagResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/workspaces/${data.workspaceId}/tags`, data);
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

export const DeleteTag = async (data: DeleteTagRequestDTO): Promise<ResponseApi<DeleteTagResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/workspaces/${data.workspaceId}/tags/${data.id}`);
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

export interface TagDTO {
  id: string;
  name: string
}

// get one
export interface GetTagRequestDTO {
  id: string;
}

export interface GetTagResponseDTO {
  tag: TagDTO | null
}

// get many
export interface GetTagsRequestDTO {
  page: number;
  workspaceId: string;
}

export interface GetTagsResponseDTO {
  list: Array<TagDTO>
}

// update one
export interface UpdateTagRequestDTO {
  name: string;
  workspaceId: string;
}

export interface UpdateTagResponseDTO {
  tag: TagDTO | null
}

// delete one
export interface DeleteTagRequestDTO {
  id: string
  workspaceId: string
}

export interface DeleteTagResponseDTO {
  id: string
}

// create one
export interface CreateTagRequestDTO {
  name: string;
  workspaceId: string;
}

export interface CreateTagResponseDTO {
  tag: TagDTO | null
}
// #endregion API