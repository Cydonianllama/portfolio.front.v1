import type { PropsWithChildren } from 'react'
// import {
//   TableBody,
// } from "../../../../../components/ui/table"
/* eslint-disable @typescript-eslint/no-empty-object-type */
export type TableBodyProps = {

}

export function TableBodyD({ children }: PropsWithChildren<TableBodyProps>) {
  return (<>
    <div className='[&>:not(:last-child)]:border-b'>
      {children}
    </div>
  </>)
}