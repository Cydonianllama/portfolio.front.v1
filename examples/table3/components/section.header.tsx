// components
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tabListConfiguration, tabsAvailables } from '../config';

export type SectionHeader = {
  title: string;
  onChangeTab?: (code: string) => void
  tab: tabsAvailables
}

export const SectionHeader = (data: PropsWithChildren<SectionHeader>) => {

  const OnChangeTab = (code: tabsAvailables) => {
    if (data.onChangeTab) data.onChangeTab(code)
  }

  return (<>
    <div className="flex flex-col gap-2.5 pb-2">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="text-xl font-semibold text-gray-700">{data.title}</h1>
        </div>
      </div>
      <div className='border-b'>
        <Tabs value={data.tab || ''} onValueChange={(code) => OnChangeTab(code)} defaultValue={tabListConfiguration.default}>
          <TabsList variant="line">
            {tabListConfiguration.list.map((el, index) => (
              <TabsTrigger
                // onClick={() => OnChangeTab(el.code)}
                key={index}
                className={index == 0 ? 'pl-0' : ''}
                value={el.title}
              >
                {el.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>

  </>)
}