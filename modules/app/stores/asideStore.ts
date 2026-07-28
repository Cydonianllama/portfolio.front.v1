// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { entityDTO } from "@/api/dataEngine/entity";
import { create } from "zustand";

interface storeAside {

  entities: Array<entityDTO>
  setEntities: (entities: Array<entityDTO>,) => void
}

export const useAside = create<storeAside>((set) => ({
  entities: [],
  setEntities: (data) => set((state) => ({ ...state, entities: data })),
}));
