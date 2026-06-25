/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';

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
import { LiaSitemapSolid } from "react-icons/lia";
import { EmptyStateComponent } from '../shared/Empty';
import { SpinnerListing } from '../shared/Listing';
import { ErrorStateComponent } from '../shared/Error';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { ManagerV1Item } from "../models/dto";

// state
import { useManagerv1Store } from '../store/store';

// icons
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
import { HiArrowsUpDown } from "react-icons/hi2";
import { HiMiniArrowSmallDown } from "react-icons/hi2";
import { MdOutlineEdit } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { HiDotsHorizontal, HiOutlineSortDescending } from "react-icons/hi";
import { HiMiniArrowSmallUp } from "react-icons/hi2";

// componente Columna personalizada
type ColumnTableStates = 'none' | 'desc' | 'asc'
type ColumnTable2Props = {
  name: string
  onChange: (status: ColumnTableStates) => void
  hasStatus?: boolean
}

const ColumnTable2 = ({ name, onChange, hasStatus = true }: ColumnTable2Props) => {

  const [status, setStatus] = useState<ColumnTableStates>('none')

  const HandleClick = useCallback(
    () => {
      if (!hasStatus) return;
      const statuses: Array<ColumnTableStates> = ['none', 'asc', 'desc']
      let index = statuses.findIndex(a => a == status)
      if (index == 2) index = 0
      else index++;
      setStatus(statuses[index])
      onChange(statuses[index])
    },
    [hasStatus, onChange, status]
  )

  return (<div className='flex justify-between items-center w-full'>
    <Button onClick={HandleClick} className={'text-gray-500 w-full flex justify-between'} size={'icon'} variant={'ghost'}>
      <span>{name}</span>

      {hasStatus && (<>
        {status == 'none' && <HiArrowsUpDown />}
        {status == 'desc' && <HiMiniArrowSmallDown />}
        {status == 'asc' && <HiMiniArrowSmallUp />}
      </>)}

    </Button>
  </div>)
}

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
    header: ({ table, column, header }) => (<>
      <ColumnTable2 hasStatus={false} name={'Id'} onChange={() => { }} />
    </>)
  },
  {
    accessorKey: "name",
    header: () => (<>
      <ColumnTable2 hasStatus={false} name={'Name'} onChange={() => { }} />
    </>)
  },
  {
    accessorKey: "description",
    header: () => (<>
      <ColumnTable2 hasStatus={false} name={'Decription'} onChange={() => { }} />
    </>)
  },
  {
    accessorKey: "id",
    header: ({ table, column, header }) => (<>
      <ColumnTable2 name={'Estatus'} onChange={() => { }} />
    </>),
    cell: ({ row }) => (<>
      <Badge variant="secondary">{row.original.statusName}</Badge>
    </>),
  },
  {
    accessorKey: 'qtyItem',
    header: ({ table, column, header }) => (<>
      <ColumnTable2 name={'Qty'} onChange={() => { }} />
    </>)
  },
  {
    id: 'date',
    header: ({ table, column, header }) => (<>
      <ColumnTable2 name={'Fecha de creación'} onChange={() => { }} />
    </>),
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
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size={'icon-xs'}><HiDotsHorizontal /></Button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              console.log("Editar", user.id)
              moduleState.setInformationUpdateItem({ isOpen: true, itemData: user, itemId: user.id })
            }}>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={() => {
              console.log("Eliminar", user.id)
              moduleState.setInformationDeleteItem({ isOpen: true, itemId: user.id })
            }}>
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export type SectionTableProps = {
  list: Array<ManagerV1Item>
  loading: boolean;
  hasError?: boolean;
  onChangeSelection?: (state: any) => void
  OnClickEmptyCreate?: () => void;
  OnClickRetry?: () => void;
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


  //Empty state
  const OnClickEmptyCreate = () => {
    if (data.OnClickEmptyCreate) data.OnClickEmptyCreate()
  }

  // Error state
  const OnClickRetry = () => {
    if (data.OnClickRetry) data.OnClickRetry()
  }

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
      <ErrorStateComponent onClickRetry={OnClickRetry} />
    </>)}

    {(!data.loading && !data.hasError) && (<>

      {/* No hay data */}
      {data.list.length == 0 && (<>
        <EmptyStateComponent
          title='Items'
          description='No tenemos items registrados'
          isActiveCreate={true}
          onClickCreate={OnClickEmptyCreate}
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
  </>)
}

