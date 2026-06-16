"use client"

// /* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/types/user.backoffice.dto';
import { ColumnDef } from '@tanstack/react-table';

export const columnsUsersTable: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: 'qtyWorkspaces',
    header: 'Qty. workspaces'
  },
  {
    accessorKey: "fullname",
    header: "Nombre"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <button
            onClick={() => console.log("Editar", user.id)}
          >
            Editar
          </button>

          <button
            onClick={() => console.log("Eliminar", user.id)}
          >
            Eliminar
          </button>
        </div>
      )
    }
  }
];