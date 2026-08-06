import { useState, type PropsWithChildren } from 'react'
import { dataEngineUIContext } from '../contexts/dataEngineUIContext'
import type { moreSections } from '../components/MoreButton/More.types'

export function DataEngineUIProvider({ children }: PropsWithChildren) {
  const [viewOpened, setViewOpened] = useState<string | null>(null)
  const [openViewConfig, setOpenViewConfig] = useState<boolean>(false)
  const [currentMoreSectionOpened, setcurrentMoreSectionOpened] = useState<moreSections>('main')
  // DataEngineContextData

  return (<>
    <dataEngineUIContext.Provider
      value={{
        //
        viewOpenedId: viewOpened,
        setViewOpened: setViewOpened,
        //
        openViewDataConfig: openViewConfig,
        setOpenViewDataConfig: setOpenViewConfig,
        // more section
        currentMoreSectionOpened: currentMoreSectionOpened,
        setMoreSectionOpened: setcurrentMoreSectionOpened
      }}
    >
      {children}
    </dataEngineUIContext.Provider>
  </>)
}