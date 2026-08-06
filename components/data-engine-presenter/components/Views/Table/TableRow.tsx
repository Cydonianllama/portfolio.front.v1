import type { PropsWithChildren } from 'react'

// import {
//   TableRow,
// } from "../../../../../components/ui/table"

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type TableRowProps = {

}

export function TableRowD({ children }: PropsWithChildren<TableRowProps>) {
  return (<>
    <div className='flex [&>:not(:last-child)]:border-r'>
      {children}
    </div>
  </>)
}