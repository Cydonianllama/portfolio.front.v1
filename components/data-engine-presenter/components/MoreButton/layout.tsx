/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
import { useContext, type PropsWithChildren } from 'react'
import { dataEngineUIContext } from '../../contexts/dataEngineUIContext'

export type LayoutSectionProps = {

}

export function Layout({ children }: PropsWithChildren<LayoutSectionProps>) {
  const dataEngineUI = useContext(dataEngineUIContext)
  return (<>
    <div className='px-2 py-2'>
      <button onClick={() => dataEngineUI.setMoreSectionOpened('main')}>
        cerrarP
      </button>
    </div>
    <div className='px-2 pb-2'>
      {children}
    </div>
  </>)
}