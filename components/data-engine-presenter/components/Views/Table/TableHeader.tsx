import type { PropsWithChildren } from 'react'

// import {
//   TableHeader,
// } from "../../../../../components/ui/table"

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type TableHeaderProps = {

}

export function TableHeaderD({ children }: PropsWithChildren<TableHeaderProps>) {
  return (<>
    <div className='border-b'>
      {children}
    </div>
  </>)
}