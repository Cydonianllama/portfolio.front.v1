// _____________ store
import { create } from "zustand";
import { TagDTO } from "@/api/tags/tags.dto";

interface chatUtilitiesStore {
  tags: Array<TagDTO>
  setTags: (tags: Array<TagDTO>) => void;

  // tags de la room abierta
  roomTags: Array<TagDTO>
  setRoomTags: (tags: Array<TagDTO>) => void;
}

export const chatUtilitiesStore = create<chatUtilitiesStore>((set) => ({
  tags: [],
  setTags: (data) => set((state) => ({ ...state, tags: data })),

  roomTags: [],
  setRoomTags: (data) => set((state) => ({ ...state, roomTags: data })),
}));
