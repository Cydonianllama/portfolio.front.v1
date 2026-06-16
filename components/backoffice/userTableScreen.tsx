"use client";

import { useUsers } from "@/hooks/bakoffice/useUsers";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import { columnsUsersTable } from "./columns.user.table";
import { useState } from "react";

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

export const UserTableScreen = () => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const { data, isLoading } = useUsers(
    page,
    query
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel()
  });

  return (<>
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
  </>)
}