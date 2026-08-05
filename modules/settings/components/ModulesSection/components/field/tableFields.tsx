//___________ ___________ Table
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
// import { useCallback, useEffect, useState } from "react"
// import { format } from 'date-fns';
// import { Checkbox } from "@/components/ui/checkbox";
// import { MdOutlineEdit } from 'react-icons/md';
import { MdOutlineEdit, MdOutlineLabel } from 'react-icons/md';
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
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FieldDTO } from '@/api/dataEngine/field'
import { useEffect, useState } from "react";
import { ResponsePagination } from "@/types/api/utils.pagination";

type FieldTableProps = {
  handleEdit: (id: string, data: FieldDTO) => void
  handleDelete: (id: string, data: FieldDTO) => void
  list: Array<FieldDTO>
  isLoading: boolean
  isError: boolean
}

export const FieldTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: FieldTableProps) => {
  // const FieldStore = useFieldStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<FieldDTO>[] = [
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
    {
      accessorKey: "name",
      header: "Nombre"
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
          description="No se ha registrado campos para esta entidad."
          title="Campos"
          isActiveCreate
          isActiveImport={false}
          isActiveLearn={false}
          onClickCreate={() => { }}
          textButtonCreate={'Agregar campo'}
          mainIcon={<MdOutlineLabel />}
        />
      </>)}
    </>)}

  </>
}

//--
// ActionsRow
type ActionsRowProps = {
  data: CellContext<FieldDTO, unknown>
  handleEdit: (id: string, data: FieldDTO) => void
  handleDelete: (id: string, data: FieldDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const FieldStore = useFieldStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // FieldStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
          handleEdit(item.id, item)
        }}
      >
        <MdOutlineEdit />
      </Button>

      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Eliminar", item.id)
          // FieldStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
          handleDelete(item.id, item)
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}

export type FieldFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const FieldFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: FieldFooterTableProps) => {
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
