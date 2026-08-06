import type { PropsWithChildren } from 'react'
// import {
//   Table,
// } from "../../../../../components/ui/table"
/* eslint-disable @typescript-eslint/no-empty-object-type */
export type TableDProps = {

}

export function TableD({ children }: PropsWithChildren<TableDProps>) {
  return (<>
    <div className='border'>
      {children}
    </div>
  </>)
}