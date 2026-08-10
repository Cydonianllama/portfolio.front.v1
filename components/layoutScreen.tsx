import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type LayoutModuleProps = {
  layoutFor?: 'table' | 'list' | 'compactmodule' | 'home',
  domConfig: React.ComponentProps<"div">
} 

export function LayoutScreen({ children, layoutFor = 'table', domConfig }: PropsWithChildren<LayoutModuleProps>){
  const { className } = domConfig
  return <>
    <div className={`
      ${cn("relative w-full h-full bg-background", className)}  
      ${layoutFor == 'table' && 'px-30'} 
      ${layoutFor == 'home' && 'px-40'} 
      ${layoutFor == 'list' && 'px-90'} 
      ${layoutFor == 'compactmodule' && 'px-0'}`
      }>
      {children}
    </div>
  </>
}