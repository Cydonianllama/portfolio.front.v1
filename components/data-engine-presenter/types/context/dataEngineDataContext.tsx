import type { DataEngineData } from "../../index";

export interface DataEngineDataContext {
  configuration: DataEngineData
  setConfiguration: (configuration: Partial<DataEngineData>) => void
}