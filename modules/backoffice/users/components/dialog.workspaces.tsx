"use client"

import { format } from "date-fns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { EmptyStateComponent } from "@/components/Empty";
import { ErrorStateComponent } from "@/components/Error";
import { SpinnerListing } from "@/components/Listing";
import { LiaSitemapSolid } from "react-icons/lia";
import { UserDTO, UserWorkspaceDTO } from "../models/dto";
import { useUserWorkspacesManagerV1 } from "../hooks/useUserWorkspaces";

const columnsWorkspacesTable: ColumnDef<UserWorkspaceDTO>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "name",
    header: "Nombre"
  },
  {
    id: "date",
    header: "Fecha de creación",
    cell: (data) => {
      return (
        <>
          {data.row.original.creationDate && (<>{format(data.row.original.creationDate, "dd/MM/yyyy")}</>)}
        </>
      )
    }
  }
];

export interface ManagerV1DialogWorkspacesConfig {
  open: boolean
  setOpen: (open: boolean) => void
  data?: UserDTO | null;
}

export const ManagerV1DialogWorkspaces = (config: ManagerV1DialogWorkspacesConfig) => {
  const userId = config.data?.id || "";
  const {
    data,
    isFetching,
    isError,
  } = useUserWorkspacesManagerV1(userId, 1, config.open);

  const list = data?.data?.list || [];

  const table = useReactTable({
    data: list,
    columns: columnsWorkspacesTable,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Workspaces asociados</DialogTitle>
          <DialogDescription>{config.data?.fullname || "Usuario"}</DialogDescription>
        </DialogHeader>

        {isFetching && (
          <SpinnerListing
            title="Listando workspaces"
            description="Espere unos momentos mientras obtenemos los workspaces"
          />
        )}

        {isError && !isFetching && (
          <ErrorStateComponent onClickRetry={() => { }} />
        )}

        {!isFetching && !isError && list.length === 0 && (
          <EmptyStateComponent
            title="Workspaces"
            description="No tenemos workspaces asociados"
            isActiveCreate={false}
            onClickCreate={() => { }}
            isActiveImport={false}
            isActiveLearn={false}
            mainIcon={<LiaSitemapSolid />}
          />
        )}

        {!isFetching && !isError && list.length > 0 && (
          <div className="border rounded flex-1">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id}>
                    {group.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => config.setOpen(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
