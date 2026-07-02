// components
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// icons
import { IoMdRefresh } from "react-icons/io";

export type SectionHeader = {
  HandleToOpenAddItem: () => void
  HandleToRefresh: () => void
}

export const SectionHeader = (data: PropsWithChildren<SectionHeader>) => {
  return (<>
    <div className="flex justify-between items-center py-5">
      <div>
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList >
            <TabsTrigger className={'p-3'} value="overview">Overview</TabsTrigger>
            <TabsTrigger className={'p-3'} value="analytics">Analytics</TabsTrigger>
            <TabsTrigger className={'p-3'} value="reports">Reports</TabsTrigger>
            <TabsTrigger className={'p-3'} value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='flex items-center gap-2 '>
        <Button variant={'outline'} onClick={data.HandleToRefresh} size={'icon'} >
          <IoMdRefresh />
        </Button>
        <Button onClick={data.HandleToOpenAddItem}>Agregar item</Button>
      </div>
    </div>
  </>)
}