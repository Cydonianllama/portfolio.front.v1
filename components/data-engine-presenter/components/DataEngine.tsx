/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { Filter, Group, More, Search, Sort, View, ViewDataConfig } from "..";
import type { DataEngineConfiguration, PresenterConfigurationModes, ViewPresenterItem } from "../types"
import { dataEngineUIContext } from "../contexts/dataEngineUIContext";
import { dataEngineDataContext } from "../contexts/dataEngineDataContext";
import { ViewManager } from "./Views/ViewManager";

interface DataEngineProps {
  configuration: DataEngineConfiguration
  onModeChange?: (mode: PresenterConfigurationModes) => void;
}

export function DataEngine({ configuration, onModeChange }: DataEngineProps) {
  console.log(configuration)

  //TODO: validar ids duplicados - records - vistas - entities

  //TODO: verificar el contexto instanciado

  const dataEngineUI = useContext(dataEngineUIContext)
  const dataEngineData = useContext(dataEngineDataContext)

  useEffect(() => {
    // setting configuration for optimistic updates
    if (configuration) {
      dataEngineData.setConfiguration(configuration)

      // view openend validation
      if (configuration.views?.length > 0) {
        let viewOpened: ViewPresenterItem | null = null
        if (dataEngineUI.viewOpenedId) {
          viewOpened = configuration.views.find(el => el.id == dataEngineUI.viewOpenedId) || null
        } else viewOpened = configuration.views[0]

        if (viewOpened) {
          console.log(`viewOpened.id = `, viewOpened.id)
          dataEngineUI.setViewOpened(viewOpened.id)
        }
      }

    }
  }, [configuration])

  return (<>
    <div className="flex flex-col w-full h-full px-5">
      <div className="flex justify-between h-10 items-center">
        <div>
          <View views={configuration.views} />
        </div>
        <div className="gap-2 flex items-center">
          <Filter />
          <Sort />
          <Group />
          <Search />
          <More
            onModeChange={(mode) => {
              if (onModeChange) onModeChange(mode)
              else console.warn('onModeChange is needed')
            }}
          />
        </div>
      </div>
      {dataEngineUI.openViewDataConfig && (
        <div>
          <ViewDataConfig />
        </div>
      )}
      <div className="flex-1 py-5">
        <ViewManager
          onAddRecord={(record) => {
            console.log({ onAddRecord: record })
            
            dataEngineData.setConfiguration({
              records: {
                ...dataEngineData.configuration.records,
                list: [
                  ...dataEngineData.configuration.records.list,
                  record
                ],
              }
            })
          }}
        />
      </div>
    </div>
  </>)
}