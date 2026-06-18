/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';

// utils
import { format } from 'date-fns';

// components
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
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"

// react-table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";

// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';

// state
import { useManagerv1Store } from '../store/store';

// icons
import { MdOutlineEdit } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { AutomationBackofficeDTO } from '../models/dto';

// configuracion de columna
export const columnsUsersTable: ColumnDef<AutomationBackofficeDTO>[] = [
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
    accessorKey: "automationId",
    header: "Id"
  },
  {
    accessorKey: "title",
    header: "Título"
  },
  {
    accessorKey: "workspaceName",
    header: "Workspace"
  },
  {
    accessorKey: 'userCreationMail',
    header: 'Usuario creador'
  },
  {
    id: 'creationDate',
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
      return (<ActionsRow data={data} />)
    }
  }
];

// ActionsRow
const ActionsRow = ({ data }: { data: CellContext<AutomationBackofficeDTO, unknown> }) => {
  const user = data.row.original;
  const moduleState = useManagerv1Store();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", user.automationId)
          moduleState.setInformationUpdateItem({ isOpen: true, itemData: user, itemId: user.automationId })
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", user.automationId)
          moduleState.setInformationDeleteItem({ isOpen: true, itemId: user.automationId })
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

export type SectionTableProps = {
  list: Array<AutomationBackofficeDTO>
  loading: boolean;
  hasError?: boolean;
  onChangeSelection?: (state: any) => void
}

export const SectionTable = (data: SectionTableProps) => {
  
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (data.onChangeSelection){
      data.onChangeSelection(rowSelection)
    }
  }, [rowSelection])

  const table = useReactTable({
    data: data.list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel(),

    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.automationId, // recomendado
  });


  //TODO:Empty state

  return (<>

    {/* Estado de error  */}
    {data.hasError && (<div className="border rounded flex-1 flex justify-center items-center">
      Error inesperado
    </div>)}

    {/* cargando data */}
    {data.loading && (<div className="border rounded flex-1 flex justify-center items-center">
      <Spinner data-icon="inline-start" />
    </div>)}

    {!data.loading && (<>

      {/* No hay data */}
      {data.list.length == 0 && (<>
        <div className="border rounded flex-1 flex justify-center items-center">
          No hay data
        </div>
      </>)}

      {/* Hay data */}
      {data.list.length > 0 && (<>
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

    </>)}
  </>)
}