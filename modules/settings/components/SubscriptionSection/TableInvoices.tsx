/*
  ComponentTableName
  EntityName
*/

import { EmptyStateComponent } from "@/components/Empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { LiaSitemapSolid } from "react-icons/lia"
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";

// utils
import { format } from 'date-fns';

// react-table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
// import {
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   PaginationState,
//   Row,
//   SortingState,
// } from "@tanstack/react-table"

// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';

type EntityName = { id: string, name: string, creationDate: Date }

type TableInvoicesProps = {
  list: Array<EntityName>,
  loading: boolean;
  hasError?: boolean;
}

export const TableInvoices = ({ list, loading, hasError }: TableInvoicesProps) => {

  // ActionsRow
  const ActionsRow = ({ data }: { data: CellContext<EntityName, unknown> }) => {
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

  // configuracion de columna
  const columnsUsersTable: ColumnDef<EntityName>[] = [
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

  return <>
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
  </>
}