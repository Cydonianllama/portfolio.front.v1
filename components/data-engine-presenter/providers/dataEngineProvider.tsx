import { type PropsWithChildren } from 'react'
import { DataEngineUIProvider } from './dataEngineUIProvider'
import { DataEngineDataProvider } from './dataEngineDataProvier'

export const DataEngineProvider = ({ children }: PropsWithChildren) => {
  return (<>
    <DataEngineUIProvider>
      <DataEngineDataProvider>
        {children}
      </DataEngineDataProvider>
    </DataEngineUIProvider>
  </>)
}