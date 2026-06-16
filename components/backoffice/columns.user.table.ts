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
    accessorKey: "fullname",
    header: "Nombre"
  },
  {
    accessorKey: "email",
    header: "Email"
  }
];