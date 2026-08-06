import { createContext } from "react";
import type { DataEngineDataContext } from "../types/context/dataEngineDataContext";
import type { DataEngineData } from "../types";

export const initialData_DataEngineData: DataEngineData = {
    entityInformation: {
      fields: [],
      id: '',
      name: ''
    },
    id: '',
    records: {
      list: [],
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 0,
        page: 1,
        total: 0,
        totalPages: 0
      }
    },
    views: [],
    moduleConfiguration: {
      showViews: false
    }
  }

export const initialData_DataEngineDataContext: DataEngineDataContext = {
  configuration: initialData_DataEngineData,
  setConfiguration: () => {}
}

export const dataEngineDataContext = createContext<DataEngineDataContext>(initialData_DataEngineDataContext)