import { PropsWithChildren } from 'react'

export function SettingsContentLayout({ children } : PropsWithChildren){
  return <>
    <div className='space-y-4 px-10 h-full @min-[575px]:px-70 flex flex-col'>
      {children}
    </div>
  </>
}