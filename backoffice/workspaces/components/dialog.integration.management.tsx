"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns";
import { toast } from "sonner";
import { useManagerv1Store } from "../store/store";
import {  IntegrationDTO } from "../models/dto";
import { SectionFooterTable } from "./section.footerTable";
import { EmptyStateComponent } from "@/components/Empty";
import { ErrorStateComponent } from "@/components/Error";
import { SpinnerListing } from "@/components/Listing";
import { PencilIcon, TrashIcon, UsersIcon, PlusIcon } from "lucide-react";
import { HiDotsHorizontal } from "react-icons/hi";
import { LiaSitemapSolid } from "react-icons/lia";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext,
  ColumnDef,
} from "@tanstack/react-table";
import { useListIntegrations } from "../hooks/useListIntegrations";

export interface DialogIntegrationConfig {
  workspaceId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ActionsRow = ({ data, workspaceId }: { data: CellContext<IntegrationDTO, unknown>; workspaceId: string }) => {
  const member = data.row.original;
  const moduleState = useManagerv1Store();
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size={'icon-sm'} variant="ghost"><HiDotsHorizontal /></Button>}>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-40'}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              moduleState.setInformationIntegrationUpdateItem({ isOpen: true, itemData: member, itemId: member.id })
            }}>
              <PencilIcon />
              Editar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              moduleState.setInformationInteagrationDeleteItem({ isOpen: true, itemId: member.id })
            }} variant="destructive">
              <TrashIcon />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const columnsIntegrationsTable = (workspaceId: string): ColumnDef<IntegrationDTO>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (<>
      {row.original.id}
    </>)
  },
  {
    accessorKey: "alias",
    header: "Name",
    cell: ({ row }) => (<>
      {row.original.alias}
    </>)
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
      return (<ActionsRow data={data} workspaceId={workspaceId} />)
    }
  }
];

export const DialogIntegrations = (config: DialogIntegrationConfig) => {
  const [page, setPage] = useState(1);
  const moduleState = useManagerv1Store();

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
  } = useListIntegrations(config.workspaceId, page);

  const list = data?.data?.list || [];
  const pagination = data?.pagination || null;

  const table = useReactTable({
    data: list,
    columns: columnsIntegrationsTable(config.workspaceId),
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  const HandleToNextPage = () => {
    if (!pagination) return;
    setPage((pagination.page || 0) + 1);
  };

  const HandleToPrevPage = () => {
    if (!pagination) return;
    setPage((pagination.page || 0) - 1);
  };

  const HandleToOpenAddIntegration = () => {
    moduleState.setInformationintegrationCreationItem({ isOpen: true });
  };

  useEffect(() => {
    if (!config.open) {
      setPage(1);
    }
  }, [config.open]);

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Administrar integraciones</DialogTitle>
          <DialogDescription>
            Gestión de integraciones del workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center py-2">
          <div className="text-sm text-muted-foreground">
            {list.length} integracion(es)
          </div>
          <Button onClick={HandleToOpenAddIntegration} size="sm">
            <PlusIcon className="mr-1 size-4" />
            Agregar integración
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {(isFetching) && (
            <SpinnerListing
              title='Listando los integraciones'
              description='Espere unos momentos mientras obtenemos las integraciones.'
            />
          )}

          {(!data?.status || isError) && !isFetching && (
            <ErrorStateComponent onClickRetry={() => {}} />
          )}

          {!isFetching && (data?.status) && (
            <>
              {list.length === 0 && (
                <EmptyStateComponent
                  title='Integraciones'
                  description='No tenemos integraciones registradas'
                  isActiveCreate={true}
                  onClickCreate={HandleToOpenAddIntegration}
                  isActiveImport={false}
                  isActiveLearn={false}
                  mainIcon={<LiaSitemapSolid />}
                />
              )}
              {list.length > 0 && (
                <div className="border rounded">
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
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center pt-2">
          <SectionFooterTable
            HandleToNextPage={HandleToNextPage}
            HandleToPrevPage={HandleToPrevPage}
            pagination={pagination}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
