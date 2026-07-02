"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
// utils
import { format } from 'date-fns';

// react-table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
import {
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
} from "@tanstack/react-table"

// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';

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

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { Badge } from '@/components/ui/badge';
import { LiaSitemapSolid } from 'react-icons/lia';
import { ErrorStateComponent } from '@/components/Error';
import { SpinnerListing } from '@/components/Listing';
import { EmptyStateComponent } from '@/components/Empty';
import { FunnelIcon, Search } from 'lucide-react';
import { IoFilterSharp } from 'react-icons/io5';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from 'react';
import { Table1ExampleModel } from './model';

//
//
//

type SimpleTablev1Props = {
  list: Array<any>
  loading: boolean;
  hasError?: boolean;
}

export const SimpleTablev1 = ({ list, loading, hasError }: SimpleTablev1Props) => {

  //
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])


  // configuracion de columna
  const columnsUsersTable: ColumnDef<Table1ExampleModel>[] = [
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
  const ActionsRow = ({ data }: { data: CellContext<Table1ExampleModel, unknown> }) => {
    const user = data.row.original;
    // const moduleState = useManagerv1Store();
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size={'icon'}
          onClick={() => {
            console.log("Editar", user.id)
            // moduleState.setInformationUpdateItem({ isOpen: true, itemData: user, itemId: user.id })
          }}
        >
          <MdOutlineEdit />
        </Button>

        <Button
          variant="outline"
          size={'icon'}
          onClick={() => {
            console.log("Eliminar", user.id)
            // moduleState.setInformationDeleteItem({ isOpen: true, itemId: user.id })
          }}
        >
          <FiTrash2 />
        </Button>
      </div>
    )
  }


  const table = useReactTable({
    data: list || [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel(),

    state: {
      // rowSelection,
    },
    // onRowSelectionChange: setRowSelection,

    getRowId: (row) => row.id, // recomendado
  });


  return (<>

    <Card className='w-full py-0 gap-0'>
      <CardHeader className='py-2 px-2 border-b flex justify-between'>
        <div className='flex gap-2 items-center'>
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline">
                  <FunnelIcon />
                  Status
                  {selectedStatuses.length > 0 && (
                    <Badge variant="secondary">
                      {selectedStatuses.length}
                    </Badge>
                  )}
                </Button>
              }
            />
            <PopoverContent className="w-40" align="start">
              {/* <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {Object.keys(statusCounts).map((status) => (
                    <div key={status} className="flex items-center gap-2.5">
                      <Checkbox
                        id={status}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => {
                          // handleStatusChange(checked === true, status)
                        }}
                      />
                      <Label
                        htmlFor={status}
                        className="flex grow items-center justify-between gap-1.5 font-normal"
                      >
                        {status}
                        <span className="text-muted-foreground">
                          {statusCounts[status]}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div> */}
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Button variant={'outline'}>
            Agregar item
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-0'>

        {/* cargando data */}
        {(loading) && (<>
          <SpinnerListing
            title='Listando los items'
            description='Espere unos momentos mientras obtenemos los items'
          />
        </>)}

        {/* Estado de error  */}
        {(hasError && !loading) && (<>
          <ErrorStateComponent onClickRetry={() => { }} />
        </>)}

        {(!loading && !hasError) && (<>

          {/* No hay data */}
          {list.length == 0 && (<>
            <EmptyStateComponent
              title='Items'
              description='No tenemos items registrados'
              isActiveCreate={true}
              onClickCreate={() => { }}
              isActiveImport={false}
              isActiveLearn={false}
              mainIcon={<LiaSitemapSolid />}
            />
          </>)}

          {/* Hay data */}
          {list.length > 0 && (<>
            <div className="flex-1">
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

      </CardContent>
      <CardFooter className='flex justify-between py-2 px-2 bg-transparent'>
        <div></div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious text='Anterior' href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext text='Siguiente' href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  </>)
}