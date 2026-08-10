/* eslint-disable react-hooks/rules-of-hooks */
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
// import { useCallback, useEffect, useState } from "react"
// import { format } from 'date-fns';
// import { Checkbox } from "@/components/ui/checkbox";
// import { MdOutlineEdit } from 'react-icons/md';
import { MdOutlineEdit, MdOutlineLabel, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';
import { Switch } from "@/components/ui/switch";
import { TriggersCatalog, PlatformIcon } from "@/modules/automation-flows/catalogs/catalogTriggers";
import { ConversationPlatform } from "@erick/conversationalflow";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IAutomationShowcaseDTO } from "@/api/automation/automation.dto";
import { ITriggerDTO } from "@/api/automation/trigger.dto";
import { UpdateTrigger } from "@/api/flow/update.trigger";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { automationStore } from "../store/automationStore";


type AutomationTableProps = {
  handleEdit: (id: string, data: IAutomationShowcaseDTO) => void
  handleDelete: (id: string, data: IAutomationShowcaseDTO) => void
  list: Array<IAutomationShowcaseDTO>
  isLoading: boolean
  isError: boolean
}

const TriggersSwitchList = ({ triggers }: { triggers?: Array<ITriggerDTO> }) => {
  const AutomationStore = automationStore();
  const [updatingIds, setUpdatingIds] = useState<Record<string, boolean>>({});

  const handleToggle = async (trigger: ITriggerDTO, checked: boolean) => {
    if (updatingIds[trigger.id]) return;

    setUpdatingIds(prev => ({ ...prev, [trigger.id]: true }));

    const req = await UpdateTrigger({
      id: trigger.id,
      isActive: checked,
    });

    if (req?.status && req.data.trigger) {
      const list = AutomationStore.list.map(automation => ({
        ...automation,
        triggers: (automation.triggers || []).map(t =>
          t.id === trigger.id ? req.data.trigger! : t
        )
      }));
      AutomationStore.setListState({ list });
      toast.success('Trigger actualizado');
    } else {
      toast.error(req?.message || 'Error al actualizar trigger');
    }

    setUpdatingIds(prev => ({ ...prev, [trigger.id]: false }));
  };

  if (!triggers || triggers.length === 0) {
    return <span className="text-xs text-muted-foreground">Sin triggers</span>;
  }

  const availableTriggerTypes = new Set(triggers.map(t => t.type));

  return (
    <div className="flex flex-col gap-2 min-w-[280px]">
      {TriggersCatalog.filter(trigger => availableTriggerTypes.has(trigger.type)).map((trigger) => {
        const triggerData = triggers.find(t => t.type === trigger.type);

        return (
          <div key={trigger.type} className="flex items-center justify-between gap-2 rounded-md border bg-mist-50 px-2 py-1.5 hover:bg-mist-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-5 w-5 rounded border flex items-center justify-center text-xs shrink-0">
                {trigger.Icon}
              </span>
              <span className="text-xs truncate">{trigger.title}</span>
            </div>
            <Switch
              size={'sm'}
              checked={triggerData?.isActive ?? false}
              disabled={updatingIds[triggerData?.id || '']}
              onCheckedChange={(checked) => {
                if (triggerData) handleToggle(triggerData, !!checked)
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const AutomationTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: AutomationTableProps) => {
  // const AutomationStore = automationStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<IAutomationShowcaseDTO>[] = [
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
    //   header: "Id",
    //   cell: ({ row }) => (<>
    //     <ShowcaseId nopadding id={row.original.id || ''}  />
    //   </>)
    // },
    {
      accessorKey: "title",
      header: "Nombre",
      cell: ({ row }) => {
        const router = useRouter()

        const triggerPlatforms = Array.from(
          new Set((row.original.triggers || []).map(t => t.platform).filter((p): p is number => p !== null && p !== undefined))
        );

        return (
          <div
            onClick={() => { router.push(`/automation/${row.original.id}`) }}
            className="flex items-center gap-2 min-w-0 cursor-pointer"
          >
            {/* <div className="flex items-center gap-1 shrink-0">
              {triggerPlatforms.map(platform => (
                <span key={platform} className="h-6 w-6 rounded-md border bg-mist-50 flex items-center justify-center text-xs text-muted-foreground">
                  {PlatformIcon[platform as ConversationPlatform]}
                </span>
              ))}
            </div> */}
            <span className="truncate text-muted-foreground hover:text-foreground text-md font-semibold">{row.original.title}</span>
          </div>
        )
      }
    },
    {
      accessorKey: "isPublished",
      header: "Estado",
      cell: ({ row }) => (<>
        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide shrink-0 ${row.original.isPublished
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${row.original.isPublished ? 'bg-green-500' : 'bg-amber-500'}`} />
          {row.original.isPublished ? 'Publicado' : 'Borrador'}
        </span>
      </>)
    },
    {
      id: "executions",
      header: "Ejecuciones",
      cell: ({ row }) => (
        <span className="inline-flex items-center justify-center rounded-full bg-mist-50 border px-2.5 py-0.5 text-xs font-medium text-foreground tabular-nums">
          {row.original.executions ?? 0}
        </span>
      )
    },
    {
      id: "triggers",
      header: "Triggers disponibles",
      cell: ({ row }) => (
        <TriggersSwitchList triggers={row.original.triggers} />
      )
    },
    {
      id: 'date',
      header: 'Fecha de creación',
      cell: (data) => {
        return (<>
          {data.row.original.creationDate && (<>{format(data.row.original.creationDate, 'dd/MM/yyyy')}</>)}
        </>)
      }
    },
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
        <div className="border  flex-1">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group, headerIdx) => (
                <TableRow key={headerIdx}>
                  {group.headers.map((header, index) => (
                    <TableHead className={`${(index == group.headers.length - 1) ? 'text-end' : ''} text-foreground bg-mist-50 py-1 text-sm`} key={index}>
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
                <TableRow  key={row.id}>
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <TableCell className={`${(cellIdx == row.getVisibleCells().length - 1) ? 'flex justify-end' : ''} text-muted-foreground py-1 min-h-10`} key={cellIdx}>
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
  data: CellContext<IAutomationShowcaseDTO, unknown>
  handleEdit: (id: string, data: IAutomationShowcaseDTO) => void
  handleDelete: (id: string, data: IAutomationShowcaseDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  const router = useRouter()
  // const AutomationStore = automationStore();

  return (
    <div className="flex items-center  gap-2">
      <Button
        variant="outline"
        size={'icon-xs'}
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
        size={'icon-xs'}
        onClick={() => {
          console.log("Editar", item.id)
          router.push(`/automation/${item.id}`)
        }}
      >
        <MdOutlineRemoveRedEye />
      </Button>

      <Button
        variant="outline"
        size={'icon-xs'}
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