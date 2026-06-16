/* eslint-disable react-hooks/rules-of-hooks */
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

// react-table
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';
import { ManagerV1Item } from "@/modules/example1/types/manager.v1";

// state
import { useManagerv1Store } from './store';

// icons
import { MdOutlineEdit } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';

// configuracion de columna
export const columnsUsersTable: ColumnDef<ManagerV1Item>[] = [
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
    header: "Descripcion"
  },
  {
    accessorKey: 'qtyItem',
    header: 'Qty'
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      const moduleState = useManagerv1Store();
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size={'icon'}
            onClick={() => {
              console.log("Editar", user.id)
              moduleState.setOpenUpdateItem(true)
            }}
          >
            <MdOutlineEdit />
          </Button>

          <Button
            variant="outline"
            size={'icon'}
            onClick={() => {
              console.log("Eliminar", user.id)
              moduleState.setOpenDeleteItem(true)
            }}
          >
            <FiTrash2 />
          </Button>
        </div>
      )
    }
  }
];

export const SectionTable = () => {

  const moduleState = useManagerv1Store();

  const table = useReactTable({
    data: [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel()
  });

  return (<>
    <div className="border rounded flex-1">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          {table.getHeaderGroups().map((group, headerIdx) => (
            <TableRow key={headerIdx}>
              {group.headers.map((header, index) => (
                <TableHead key={index}>
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
                <TableCell key={cellIdx}>
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
  </>)
}