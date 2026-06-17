// components
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'

export type SectionHeader = {
  title: string;
  description: string;
  HandleToOpenAddItem: () => void
}

export const SectionHeader = (data: PropsWithChildren<SectionHeader>) => {

  return (<>
    <div className="flex justify-between items-center py-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">{data.title}</h1>
        <p className="text-md text-gray-400">{data.description}</p>
      </div>
      <div>
        <Button onClick={data.HandleToOpenAddItem}>Agregar item</Button>
      </div>
    </div>
  </>)
}