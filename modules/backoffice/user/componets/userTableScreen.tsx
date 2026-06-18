"use client";

// utils
import { useState } from "react";

// listado principal
import { useUsers } from "@/modules/backoffice/user/hooks/useUsers";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import { columnsUsersTable } from "./columns.user.table";

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

export const UserTableScreen = () => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const { data, isLoading, error } = useUsers(
    page,
    query
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel()
  });

  return (<>
    <div className="relative h-full  px-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Administracion de usuarios</h1>
          <p className="text-lg">Pantalla de administración de usuarios</p>
        </div>
        <div>
          <Button>Agregar</Button>
        </div>
      </div>
      <div className="border">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
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
    </div>
  </>)
}