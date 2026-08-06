import type { moreSections } from "../../components/MoreButton/More.types";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type DataEngineUIContext = {
  //
  viewOpenedId: string | null
  setViewOpened: (viewOpenedId: string | null) => void;
  //
  openViewDataConfig: boolean
  setOpenViewDataConfig: (openViewDataConfig: boolean) => void;
  // more
  currentMoreSectionOpened: moreSections,
  setMoreSectionOpened: (currentMoreSectionOpened: moreSections) => void;
}