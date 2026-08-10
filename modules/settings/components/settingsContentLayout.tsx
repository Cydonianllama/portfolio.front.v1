import { PropsWithChildren } from 'react'

export function SettingsContentLayout({ children } : PropsWithChildren){
  return <>
    <div className='space-y-4 px-50'>
      {children}
    </div>
  </>
}