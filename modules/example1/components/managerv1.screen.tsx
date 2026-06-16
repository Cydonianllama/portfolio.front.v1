/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//

// utils
import { useState } from "react";

// listado principal
import { useListManagerV1 } from "@/modules/example1/hooks/useListManagerV1";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

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
import { Input } from '@/components/ui/input'
import { InputSearchTable } from '@/components/InputSearchTable'

// configuracion de columna
import { ColumnDef } from '@tanstack/react-table';
import { ManagerV1Item } from "@/modules/example1/types/manager.v1";
import { useManagerv1Store } from "./managerv1.store";
import { ManagerV1DialogCreate } from "./managerv1.dialog.create";
import { ManagerV1DialogEdit } from "./managerv1.dialog.edit";
import { ManagerV1DialogConfirmDelete } from "./managerv1.dialog.confirmdelete";

export const columnsUsersTable: ColumnDef<ManagerV1Item>[] = [
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
    header: "Descripcion"
  },
  {
    accessorKey: 'qtyItem',
    header: 'Qty'
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      const moduleState = useManagerv1Store();
      return (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              console.log("Editar", user.id)
            }}
          >
            Editar
          </Button>

          <Button
            onClick={() => {
              console.log("Eliminar", user.id)
            }}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  }
];

export const Managerv1Screen = () => {

  const moduleState = useManagerv1Store();

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const { data, isLoading, error } = useListManagerV1(
    page,
    query
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columnsUsersTable,
    getCoreRowModel: getCoreRowModel()
  });

  //
  // HEADER
  //
  const HandleToOpenAddItem = () => {
    moduleState.setOpenCreateItem(true)
  }

  const OnSearch = async (text: string) => {

  }

  //
  // HEADER FILTER
  //


  //
  // DIALOG
  //
  const OnCreateItem = async () => {

  }

  const OnUpdateItem = async () => {

  }

  const OnDeleteItem = async () => {

  }

  return (<>
    <div className="relative h-full  px-12">

      {/* start::header */}
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">Administracion de usuarios</h1>
          <p className="text-md text-gray-400">Pantalla de administración de usuarios</p>
        </div>
        <div>
          <Button onClick={HandleToOpenAddItem}>Agregar usuario</Button>
        </div>
      </div>
      {/* end::header */}

      {/* start::header filter  */}
      <div className="flex justify-between items-center pb-5">
        <div></div>
        <div>
          <InputSearchTable
            onSearch={OnSearch}
            placeholder="Buscar"
            timeout={600}
          />
        </div>
      </div>
      {/* end::header filter  */}

      {/* start::table */}
      <div className="border rounded">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
      {/* end::table */}


      {/* start::Dialogs */}

      <ManagerV1DialogCreate
        open={moduleState.isOpenCreateItem}
        setOpen={(open) => moduleState.setOpenCreateItem(open)}
        onCreate={OnCreateItem}
      />

      <ManagerV1DialogEdit
        open={moduleState.isOpenUpdateItem}
        setOpen={(open) => moduleState.setOpenUpdateItem(open)}
        onUpdate={OnUpdateItem}
      />

      <ManagerV1DialogConfirmDelete
        open={moduleState.isOpenDeleteItem}
        setOpen={(open) => moduleState.setOpenDeleteItem(open)}
        onDelete={OnDeleteItem}
      />
      {/* end::Dialogs */}



    </div>
  </>)
}