import type { PropsWithChildren } from 'react'

// import {
//   TableCell,
// } from "../../../../../components/ui/table"

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type TableCellProps = {

}

export function TableCellD({ children }: PropsWithChildren<TableCellProps>) {
  return (<>
    <div className='min-h-9 min-w-30 flex items-center px-1 text-foreground text-sm'>
      {children}
    </div>
  </>)
}