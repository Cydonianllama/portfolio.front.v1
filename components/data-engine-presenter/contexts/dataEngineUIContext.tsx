import { createContext } from "react";
import type { DataEngineUIContext } from "../types/context/dataEngineUIContext";

const initState: DataEngineUIContext = {
  setViewOpened: () => {},
  viewOpenedId: null,
  //
  openViewDataConfig: false,
  setOpenViewDataConfig: () => {},
  //
  currentMoreSectionOpened: 'main',
  setMoreSectionOpened: () => {}
}

export const dataEngineUIContext = createContext<DataEngineUIContext>(initState)