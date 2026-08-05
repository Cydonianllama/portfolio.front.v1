'use client'
/*
  Variables
*/

/*
  Variable
*/

// #region Components
//___________ components
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { useAppData } from "@/hooks/app/useAppData"
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

type VariableProps = {

}

export const VariableSection = ({ }: VariableProps) => {
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})
  const appData = useAppData()

  const InitialList = () => {
    useVariablesActions.listVariablesAction({ page: 1, workspaceId: appData.workspace?.id || '' })
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
    <FolderSection />

    <div className="p-2">

      <div className="flex justify-between gap-2 items-center mb-2">
        <h1 className="text-lg font-semibold flex gap-1 items-center">
          <TbCodeVariable />
          Mis variables
        </h1>
        <div>
          <Button disabled={VariableStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { VariableStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button>
        </div>
      </div>

      <VariableList_
        isError={false}
        isLoading={VariableStore.listing}
        list={VariableStore.list}
        HandleDragEndEvent={() => { }}
        onClickDelete={(id, item) => {
          VariableStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          VariableStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <VariableFooterTable
        HandleToNextPage={() => {
          if (!VariableStore.pagination) return;
          VariableStore.setListState({
            pagination: {
              ...VariableStore.pagination,
              page: VariableStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!VariableStore.pagination) return;
          VariableStore.setListState({
            pagination: {
              ...VariableStore.pagination,
              page: VariableStore.pagination?.page - 1,
            }
          })
        }}
        pagination={VariableStore.pagination}
      />
    </div>

    <DialogCreateVariable />
    <DialogUpdateVariable />
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

type VariableListProps = {
  list: Array<VariableDTO>,
  isLoading: boolean
  isError: boolean
  HandleDragEndEvent?: (event: DragEndEvent) => void;
  onClickEdit?: (id: string, item: VariableDTO) => void
  onClickDelete?: (id: string, item: VariableDTO) => void
}

export const VariableList_ = ({ isLoading, isError, list, HandleDragEndEvent, onClickDelete, onClickEdit }: VariableListProps) => {
  const VariableStore = useVariableStore();
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
                {list.map((item, idx) => (<SortableItem id={item.id} data={item} key={idx} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />))}
              </SortableContext>
            </DndContext>
          </ItemGroup>
        </>)}

        {list.length == 0 && (<>
          <EmptyStateComponent
            description="Usted no cuenta con variables."
            title="Variables"
            isActiveCreate
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => {
              VariableStore.setCreateState({ openCreate: true })
            }}
            textButtonCreate={'Agregar variable'}
            mainIcon={<MdOutlineLabel />}
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
  data: VariableDTO
  onClickEdit?: (id: string, item: VariableDTO) => void
  onClickDelete?: (id: string, item: VariableDTO) => void
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

  const HandleClickEdit = (id: string, item: VariableDTO) => {
    if (onClickEdit) onClickEdit(id, item)
  }

  const HandleClickDelete = (id: string, item: VariableDTO) => {
    if (onClickDelete) onClickDelete(id, item)
  }

  return (
    <Item
      size={'xs'}
      ref={setNodeRef}
      style={style}

      // className="bg-gray-50"
      variant="outline"
    >
      <ItemMedia
        {...attributes}
        {...listeners}
        variant="icon"
      >
        {/* <PiDotsSixVerticalBold /> */}
        <TbCodeVariable />
      </ItemMedia>
      <ItemContent>

        <div className="flex items-center gap-1.5">
          <ItemTitle className="font-semibold">
            {/* <div className={`h-2 w-2 rounded-full ${ColorsSelector.find(el => el.code == data.color)?.classname || 'bg-gray-500'}`}></div> */}
            {data.name}
          </ItemTitle>
          {/* <LuDot /> */}
          {/* <span className="text-gray-500">x registros</span> */}
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

export type VariableFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const VariableFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: VariableFooterTableProps) => {
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

type DialogCreateVariableProps = {

}

const DialogCreateVariable = ({ }: DialogCreateVariableProps) => {
  const appData = useAppData()
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationVariablesSchema>({
    resolver: zodResolver(creationVariablesSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!VariableStore.openCreate) {
      reset({
        name: '',
      });
    }
  }, [VariableStore.openCreate, reset]);

  const HandleToCreate = async (data: CreationVariablesSchema) => {
    await useVariablesActions.createVariablesAction({
      name: data.name,
      workspaceId: appData.workspace?.id || '',
    })
  }

  return <>
    <Dialog open={VariableStore.openCreate} onOpenChange={(open) => { VariableStore.setCreateState({ openCreate: open }) }} >
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
          <Button disabled={VariableStore.creating ? true : false} onClick={handleSubmit(HandleToCreate)} type="button">
            {VariableStore.creating && <Spinner data-icon="inline-start" />}
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

type DialogUpdateVariableProps = {

}

const DialogUpdateVariable = ({ }: DialogUpdateVariableProps) => {
  const appData = useAppData()
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const currentOpened = VariableStore.list.find(el => VariableStore.currentElementSelected == el.id)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<UpdateVariablesSchema>({
    resolver: zodResolver(updateVariablesSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (!VariableStore.openUpdate) {
      reset({
        name: '',
      });
    }

    if (currentOpened) {
      reset({
        name: currentOpened.name,
      })
    }


  }, [VariableStore.openUpdate, reset, currentOpened]);

  const HandleToUpdate = async (data: UpdateVariablesSchema) => {
    if (!currentOpened) return;
    await useVariablesActions.updateVariablesAction(currentOpened.id, {
      name: data.name,
      workspaceId: appData.workspace?.id || ''
    })
  }
  return <>
    <Dialog open={VariableStore.openUpdate} onOpenChange={(open) => { VariableStore.setUpdateState({ openUpdate: open }) }}>
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
          <Button disabled={VariableStore.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {VariableStore.updating && <Spinner data-icon="inline-start" />}
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
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})

  const HandleToDelete = () => {
    if (!VariableStore.currentElementSelected) return;
    useVariablesActions.deleteVariablesAction({ id: VariableStore.currentElementSelected || '' })
  }

  return <>
    <Dialog open={VariableStore.openDelete} onOpenChange={(open) => { VariableStore.setDeleteState({ openDelete: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Presiona <strong>Confirmar eliminación</strong> para continuar
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button disabled={VariableStore.deleting ? true : false} onClick={HandleToDelete} type="button">
            {VariableStore.deleting && <Spinner data-icon="inline-start" />}
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

export const creationVariablesSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type CreationVariablesSchema = z.infer<typeof creationVariablesSchema>;

// update schema

export const updateVariablesSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
});

export type UpdateVariablesSchema = z.infer<typeof updateVariablesSchema>;
// #endregion Schemas

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export type UseVariablesActionsProps = {

}

export const UseVariablesActions = ({ }: UseVariablesActionsProps) => {
  const VariableStore = useVariableStore();

  const createVariablesAction = useCallback(async (data: CreateVariableRequestDTO) => {
    try {
      VariableStore.setCreateState({ creating: true })
      const reqCreation = await CreateVariable(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.variable && reqCreation.status) {
        const list = [reqCreation?.data.variable, ...VariableStore.list]
        VariableStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      VariableStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [VariableStore.list])

  const updateVariablesAction = useCallback(async (id: string, data: UpdateVariableRequestDTO) => {
    try {
      VariableStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateVariable(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.variable) {
        let list = [...VariableStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.variable || el
          } else {
            return el;
          }
        })
        VariableStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      VariableStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [VariableStore.list])

  const listVariablesAction = useCallback(async (data: GetVariablesRequestDTO) => {
    try {
      VariableStore.setListState({ listing: true })

      if (data.page == 1) {
        VariableStore.setListState({ list: [] })
      }

      const reqList = await GetVariable(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        VariableStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          VariableStore.setListState({ list: reqList.data.list })
        } else {
          VariableStore.setListState({ list: [...VariableStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      VariableStore.setListState({ listing: false })
    }
  }, [])

  const deleteVariablesAction = useCallback(async (data: DeleteVariableRequestDTO) => {
    try {
      VariableStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteVariable(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...VariableStore.list]
        list = list.filter(el => el.id != data.id)
        VariableStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      VariableStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [VariableStore.list])

  return {
    createVariablesAction,
    updateVariablesAction,
    listVariablesAction,
    deleteVariablesAction,
  }
}
// #endregion Hooks

/*
  Variable
*/
// #region Store
//___________ store

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface VariableStore {
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
  list: Array<VariableDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<VariableDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useVariableStore = create<VariableStore>((set) => ({
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
/api/variables
Variable
variable
*/
// #region API
//___________ api

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { FolderSection } from "./folder_scratch"
import { TbCodeVariable } from "react-icons/tb"

export const GetVariable = async (data: GetVariablesRequestDTO): Promise<ResponseApi<GetVariablesResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/variables?page=${data.page}&workspaceId=${data.workspaceId}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


export const UpdateVariable = async (id: string, data: UpdateVariableRequestDTO): Promise<ResponseApi<UpdateVariableResponseDTO> | null> => {
  try {
    const req = await api.put(`/api/variables/${id}`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const CreateVariable = async (data: CreateVariableRequestDTO): Promise<ResponseApi<CreateVariableResponseDTO> | null> => {
  try {
    const req = await api.post(`/api/variables`, data);
    return req.data;
  } catch (ex) {
    return null;
  }
}

export const DeleteVariable = async (data: DeleteVariableRequestDTO): Promise<ResponseApi<DeleteVariableResponseDTO> | null> => {
  try {
    const req = await api.delete(`/api/variables/${data.id}`);
    return req.data;
  } catch (ex) {
    return null;
  }
}


///
/// DTOs
///

export interface VariableDTO {
  id: string;
  name: string
}

// get one
export interface GetVariableRequestDTO {
  id: string;
}

export interface GetVariableResponseDTO {
  variable: VariableDTO | null
}

// get many
export interface GetVariablesRequestDTO {
  page: number;
  workspaceId: string;
}

export interface GetVariablesResponseDTO {
  list: Array<VariableDTO>
}

// update one
export interface UpdateVariableRequestDTO {
  name: string;
  workspaceId: string;
}

export interface UpdateVariableResponseDTO {
  variable: VariableDTO | null
}

// delete one
export interface DeleteVariableRequestDTO {
  id: string
}

export interface DeleteVariableResponseDTO {
  id: string
}

// create one
export interface CreateVariableRequestDTO {
  name: string;
  workspaceId: string;
}

export interface CreateVariableResponseDTO {
  variable: VariableDTO | null
}
// #endregion API