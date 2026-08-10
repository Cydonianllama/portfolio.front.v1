import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
import { useCallback, useEffect, useState } from "react"
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineEdit } from 'react-icons/md';
import { MdOutlineLabel } from 'react-icons/md';
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
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { entityDTO } from "@/api/dataEngine/entity"
import { catalogEntityIcons } from "../../catalog/icons.catalog"

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';
import { ResponsePagination } from "@/types/api/utils.pagination";

type EntityTableProps = {
  handleEdit: (id: string, data: entityDTO) => void
  handleDelete: (id: string, data: entityDTO) => void
  list: Array<entityDTO>
  isLoading: boolean
  isError: boolean
}

export const EntityTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: EntityTableProps) => {
  // const EntityStore = useEntityStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<entityDTO>[] = [
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
    //   header: "Id"
    // },
    // {
    //   id: "icon",
    //   header: "Icono",
    //   cell: (data) => {
    //     const icon = catalogEntityIcons.find(el => el.code == data.row.original.codeIcon)
    //     return (<>
    //       <div className="flex items-center justify-start text-lg">
    //         {icon ? icon.Icon : <span className="text-muted-foreground">-</span>}
    //       </div>
    //     </>)
    //   }
    // },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: (data) => {
        const icon = catalogEntityIcons.find(el => el.code == data.row.original.codeIcon)
        return (<>
          <div className="flex gap-1 items-center justify-start text-md">
            {icon ? icon.Icon : <span className="text-muted-foreground">-</span>}
            {data.row.original.name}
          </div>
        </>)
      }
    },
    // {
    //   id: 'date',
    //   header: 'Fecha de creación',
    //   cell: (data) => {
    //     return (<>
    //       {data.row.original.creationDate && (<>{format(data.row.original.creationDate, 'dd/MM/yyyy')}</>)}
    //     </>)
    //   }
    // },
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
      {list.length == 0 && (<>
        <EmptyStateComponent
          description="Usted no cuenta con items."
          title="Items"
          isActiveCreate
          isActiveImport={false}
          isActiveLearn={false}
          onClickCreate={() => { }}
          textButtonCreate={'Agregar item'}
          mainIcon={<MdOutlineLabel />}
        />
      </>)}
    </>)}

  </>
}

//--
// ActionsRow
type ActionsRowProps = {
  data: CellContext<entityDTO, unknown>
  handleEdit: (id: string, data: entityDTO) => void
  handleDelete: (id: string, data: entityDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const EntityStore = useEntityStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon-sm'}
        onClick={() => {
          console.log("Editar", item.id)
          // EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
          handleEdit(item.id, item)
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon-sm'}
        onClick={() => {
          console.log("Eliminar", item.id)
          // EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
          handleDelete(item.id, item)
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}


export type EntityFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const EntityFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: EntityFooterTableProps) => {
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
