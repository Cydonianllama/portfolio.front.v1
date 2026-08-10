/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext
} from "@tanstack/react-table";
import { ColumnDef } from '@tanstack/react-table';
import { useWidgetStore } from '../store/store';
import { FiTrash2 } from 'react-icons/fi';
import { EmptyStateWidgetComponent } from './shared/Empty';
import { ListingStateWidgetComponent, ErrorStateWidgetComponent } from './shared/Listing';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { WidgetDTO } from '../models/dto';
import { BsWidget } from 'react-icons/bs';

export const columnsWidgetsTable: ColumnDef<WidgetDTO>[] = [
  {
    accessorKey: "name",
    header: "Nombre"
  },
  {
    id: "UIconfig.title",
    header: "Título UI",
    cell: ({ row }) => row.original.UIconfig?.title || '-'
  },
  {
    id: "isDark",
    header: "Modo oscuro",
    cell: ({ row }) => (
      <Badge variant={row.original.isDark ? "default" : "secondary"}>
        {row.original.isDark ? 'Sí' : 'No'}
      </Badge>
    )
  },
  {
    id: "UIconfig.allowFiles",
    header: "Archivos",
    cell: ({ row }) => row.original.UIconfig?.allowFiles ? 'Sí' : 'No'
  },
  {
    id: "UIconfig.allowEmojis",
    header: "Emojis",
    cell: ({ row }) => row.original.UIconfig?.allowEmojis ? 'Sí' : 'No'
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
      return (<ActionsRow data={data} />)
    }
  }
];

export const ActionsRow = ({ data }: { data: CellContext<WidgetDTO, unknown> }) => {
  const widget = data.row.original;
  const moduleState = useWidgetStore();
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size={'icon-sm'} variant="ghost"><HiDotsHorizontal /></Button>}>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-45'}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              moduleState.setInformationUpdateItem({ isOpen: true, itemData: widget, itemId: widget.id })
            }}>
              <PencilIcon />
              Editar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {
              moduleState.setInformationDeleteItem({ isOpen: true, itemId: widget.id })
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

export type SectionTableWidgetProps = {
  list: Array<WidgetDTO>
  loading: boolean;
  hasError?: boolean;
  OnClickEmptyCreate?: () => void;
  OnClickRetry?: () => void;
}

export const SectionTableWidget = (data: SectionTableWidgetProps) => {

  const table = useReactTable({
    data: data.list || [],
    columns: columnsWidgetsTable,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  const OnClickEmptyCreate = () => {
    if (data.OnClickEmptyCreate) data.OnClickEmptyCreate()
  }

  const OnClickRetry = () => {
    if (data.OnClickRetry) data.OnClickRetry()
  }

  return (<>
    {(data.loading) && (<>
      <ListingStateWidgetComponent
        title='Listando los items'
        description='Espere unos momentos mientras obtenemos los items'
      />
    </>)}

    {(data.hasError && !data.loading) && (<>
      <ErrorStateWidgetComponent onClickRetry={OnClickRetry} />
    </>)}

    {(!data.loading && !data.hasError) && (<>
      {data.list.length == 0 && (<>
        <EmptyStateWidgetComponent
          title='Widgets'
          description='No tenemos widgets registrados'
          isActiveCreate={true}
          onClickCreate={OnClickEmptyCreate}
        />
      </>)}

      {data.list.length > 0 && (<>
        <div className="flex-1 min-w-0 w-full">
          <div className='border'>
            <Table className='min-w-full w-full'>
              <TableHeader className='bg-gray-50'>
                {table.getHeaderGroups().map((group, headerIdx) => (
                  <TableRow key={headerIdx}>
                    {group.headers.map((header, index) => (
                      <TableHead className={`${(index == group.headers.length - 1) ? 'text-end' : ''} py-1 text-sm text-foreground`} key={index}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='overflow-auto'>
                {table.getRowModel().rows.map((row) => (
                  <TableRow className='border-b' key={row.id}>
                    {row.getVisibleCells().map((cell, cellIdx) => (
                      <TableCell className={`${(cellIdx == row.getVisibleCells().length - 1) ? 'flex justify-end' : ''} py-1 text-foreground`} key={cellIdx}>
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
      </>)}
    </>)}
  </>)
}
