/* eslint-disable react-hooks/rules-of-hooks */

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
import { ManagerV1Item } from "@/modules/example1/types/manager.v1";

// state
import { useManagerv1Store } from '../store/store';

// icons
import { MdOutlineEdit } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';

// configuracion de columna
export const columnsUsersTable: ColumnDef<ManagerV1Item>[] = [
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
  {
    accessorKey: "description",
    header: "Descripción"
  },
  {
    accessorKey: "id",
    header: "Estatus",
    cell: ({ row }) => (<>
      <Badge variant="secondary">{row.original.statusName}</Badge>
    </>),
  },
  {
    accessorKey: 'qtyItem',
    header: 'Qty'
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
      return (<ActionsRow data={data} />)
    }
  }
];

// ActionsRow
const ActionsRow = ({ data }: { data: CellContext<ManagerV1Item, unknown> }) => {
  const user = data.row.original;
  const moduleState = useManagerv1Store();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", user.id)
          moduleState.setInformationUpdateItem({ isOpen: true, itemData: user, itemId: user.id })
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", user.id)
          moduleState.setInformationDeleteItem({ isOpen: true, itemId: user.id })
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

export type SectionTableProps = {
  list: Array<ManagerV1Item>
  loading: boolean;
}

export const SectionTable = (data: SectionTableProps) => {

  const table = useReactTable({
    data: data.list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel()
  });

  //TODO:Empty state

  return (<>

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