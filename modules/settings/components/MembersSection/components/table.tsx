import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";

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
import { MemberDTO, InvitationMemberStatus, MemberStatusConfiguration, MemberStatus, configurationDefaultRoles, DefaultRole } from "@/api/members/members"
import { useEffect, useState } from "react";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { Badge } from "@/components/ui/badge";

type MembersTableProps = {
  handleEdit: (id: string, data: MemberDTO) => void
  handleDelete: (id: string, data: MemberDTO) => void
  list: Array<MemberDTO>
  isLoading: boolean
  isError: boolean
}

export const MembersTable_ = ({ handleDelete, handleEdit, list, isLoading, isError }: MembersTableProps) => {
  // const MembersStore = useMembersStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // cuando cambia de seleccion
  }, [rowSelection])

  // configuracion de columna
  const columnsUsersTable: ColumnDef<MemberDTO>[] = [
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

    // configurationDefaultRoles

    {
      accessorKey: "email",
      header: "Email",
      cell: (data) => {
        return (<>
          <div className="flex gap-1">
            <span>{data.row.original.email}</span>
            {(data.row.original.invitation?.status != InvitationMemberStatus.acepted && !data.row.original.isOwner) && (<>
              <Badge>
                {data.row.original.invitation?.status == InvitationMemberStatus.pending && 'Invitación pediente'}
                {data.row.original.invitation?.status == InvitationMemberStatus.rechazed && 'Invitación rechazada'}
              </Badge>
            </>)}
            {data.row.original.isOwner && (<Badge>Owner</Badge>)}
          </div>
        </>)
      }
    },
    {
      accessorKey: "status",
      header: "Estatus",
      cell: (data) => {
        return (<>
          {MemberStatusConfiguration[(data.row.original.status || 0) as MemberStatus]?.text || '-'}
        </>)
      }
    },
    {
      accessorKey: "rolId",
      header: "Rol",
      cell: (data) => {
        return (<>
          {configurationDefaultRoles[data.row.original.rolId as DefaultRole]?.text || '-'}
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
        <div className="border rounded-lg flex-1 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((group, headerIdx) => (
                <TableRow className="bg-gray-50 *:border-border [&>:not(:last-child)]:border-r" key={headerIdx}>
                  {group.headers.map((header, index) => (
                    <TableHead className={`${(index == group.headers.length - 1) ? 'text-end' : ''} text-foreground text-sm py-1`} key={index}>
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
                <TableRow className="*:border-border [&>:not(:last-child)]:border-r" key={row.id}>
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <TableCell className={`${(cellIdx == row.getVisibleCells().length - 1) ? 'flex justify-end' : ''} text-muted-foreground text-sm py-1`} key={cellIdx}>
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
  data: CellContext<MemberDTO, unknown>
  handleEdit: (id: string, data: MemberDTO) => void
  handleDelete: (id: string, data: MemberDTO) => void
}

const ActionsRow = ({ data, handleDelete, handleEdit }: ActionsRowProps) => {
  const item = data.row.original;
  // const MembersStore = useMembersStore();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size={'icon'}
        onClick={() => {
          console.log("Editar", item.id)
          // MembersStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
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
          // MembersStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
          handleDelete(item.id, item)
        }}
      >
        <FiTrash2 />
      </Button>
    </div>
  )
}


export type MembersFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const MembersFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: MembersFooterTableProps) => {
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