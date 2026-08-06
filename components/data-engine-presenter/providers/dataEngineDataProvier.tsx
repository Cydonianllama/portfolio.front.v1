/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useState, type PropsWithChildren } from 'react'
import { dataEngineDataContext, initialData_DataEngineData } from '../contexts/dataEngineDataContext'
import type { DataEngineData } from '../types'

export const DataEngineDataProvider = ({ children }: PropsWithChildren) => {

  const [configuration, setConfiguration] = useState<DataEngineData>(initialData_DataEngineData)

  const HandleUpdateConfiguration = useCallback((data: Partial<DataEngineData>) => {
    console.log('HandleUpdateConfiguration')
    setConfiguration({
      ...configuration,
      ...data
    })
  }, [configuration])

  return (<>
    <dataEngineDataContext.Provider value={{
      configuration: configuration,
      setConfiguration: HandleUpdateConfiguration
    }}>
      {children}
    </dataEngineDataContext.Provider>

  </>)
}