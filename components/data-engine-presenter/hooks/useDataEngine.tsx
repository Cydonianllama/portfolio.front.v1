/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react"
import { dataEngineDataContext } from "../contexts/dataEngineDataContext"
import { dataEngineUIContext } from "../contexts/dataEngineUIContext"
import type { ViewPresenterItem } from "../index"
// import type { ViewPresenterItem } from "../../types"

export const useDataEngine = () => {
  const dataEngineUI = useContext(dataEngineUIContext)
  const dataEngineData = useContext(dataEngineDataContext)

  const [viewsIsEmpty, setViewsIsEmpty] = useState(false)
  const [currentView, setCurrentView] = useState<ViewPresenterItem | null>(null)

  

  useEffect(() => {
  if (!dataEngineData.configuration) return;

  setCurrentView(
    dataEngineData.configuration.views.find(
      el => el.id === dataEngineUI.viewOpenedId
    ) ?? null
  );
}, [dataEngineData.configuration, dataEngineUI.viewOpenedId]);

  useEffect(() => {

    const configuration = dataEngineData.configuration;

    if (!configuration) return;

    // existence of view validation
    let notViewsCreated = false;
    if (configuration.views) {
      if (configuration.views.length == 0) {
        notViewsCreated = true;
      }
    } else notViewsCreated = true
    if (notViewsCreated) {
      setViewsIsEmpty(true)
    }

  }, [dataEngineData.configuration])

  console.log('UseDataEngine', currentView)

  return {
    viewsIsEmpty,
    currentView
  }
}