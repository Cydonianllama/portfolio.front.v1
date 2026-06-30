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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { WorkspaceDTO } from '../models/dto';
import { LiaSitemapSolid } from 'react-icons/lia';
import { EmptyStateComponent } from '@/components/Empty';
import { ErrorStateComponent } from '@/components/Error';
import { SpinnerListing } from '@/components/Listing';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { HiDotsHorizontal } from 'react-icons/hi';

// configuracion de columna
export const columnsUsersTable: ColumnDef<WorkspaceDTO>[] = [
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
    accessorKey: "username",
    header: "Usuario",
    cell: ({ row }) => (<>
      {row.original.mainUser?.name || ''}
    </>)
  },
  // {
  //   accessorKey: "id",
  //   header: "Estatus",
  //   cell: ({ row }) => (<>
  //     <Badge variant="secondary">{row.original.statusName}</Badge>
  //   </>),
  // },
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
const ActionsRow = ({ data }: { data: CellContext<WorkspaceDTO, unknown> }) => {
  const user = data.row.original;
  const moduleState = useManagerv1Store();
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size={'icon-sm'} variant="ghost"><HiDotsHorizontal /></Button>}>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-40'}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              console.log("Editar", user.id)
              moduleState.setInformationUpdateItem({ isOpen: true, itemData: user, itemId: user.id })
            }}>
              <PencilIcon />
              Editar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              console.log("Eliminar", user.id)
              moduleState.setInformationDeleteItem({ isOpen: true, itemId: user.id })
            }} variant="destructive">
              <TrashIcon />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export type SectionTableProps = {
  list: Array<WorkspaceDTO>
  loading: boolean;
  hasError?: boolean;
  onChangeSelection?: (state: any) => void
}

export const SectionTable = (data: SectionTableProps) => {

  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (data.onChangeSelection) {
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
    getRowId: (row) => row.id, // recomendado
  });


  //TODO:Empty state

  return (<>
    {/* cargando data */}
    {(data.loading) && (<>
      <SpinnerListing
        title='Listando los items'
        description='Espere unos momentos mientras obtenemos los items'
      />
    </>)}

    {/* Estado de error  */}
    {(data.hasError && !data.loading) && (<>
      <ErrorStateComponent onClickRetry={() => {}} />
    </>)}
    {!data.loading && (<>

      {/* No hay data */}
      {(!data.loading && !data.hasError) && (<>

        {data.list.length == 0 && (<>
          <EmptyStateComponent
            title='Items'
            description='No tenemos items registrados'
            isActiveCreate={true}
            onClickCreate={() => {}}
            isActiveImport={false}
            isActiveLearn={false}
            mainIcon={<LiaSitemapSolid />}
          />
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



    </>)}
  </>)
}