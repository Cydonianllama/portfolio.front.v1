"use client"

import { useMemo } from "react";
import Select from "react-select";
import { TagDTO } from "@/api/tags/tags.dto";
import { useChatStore } from "../../../store/store.chat";
import { chatUtilitiesStore } from "../../../store/store.utilities";
import { useUtilitiesChatActions } from "../../../actions/useUtilitiesChat";

type TagOption = {
  value: string;
  label: string;
}

const toOptions = (tags: Array<TagDTO>): Array<TagOption> =>
  (tags || []).map((el) => ({ value: el.id, label: el.name }))

export const RoomTagsSection = () => {
  const chatStore = useChatStore()
  const chatUtilities = chatUtilitiesStore()
  const utilitiesChatActions = useUtilitiesChatActions({})

  const options = useMemo(() => toOptions(chatUtilities.tags), [chatUtilities.tags])
  const selectedOptions = useMemo(() => toOptions(chatUtilities.roomTags), [chatUtilities.roomTags])

  const HandleChange = (selected: Array<TagOption>) => {
    const roomId = chatStore.roomIdOpened
    if (!roomId) return

    const tags = selected.map((el) => el.value)
    utilitiesChatActions.UpdateRoomTagsAction({ roomId, tags })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
          Etiquetas
        </div>
      </div>

      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={(selected) => HandleChange(selected as Array<TagOption>)}
        placeholder="Buscar y agregar etiquetas..."
        noOptionsMessage={() => "No hay etiquetas disponibles"}
        className="text-xs"
        styles={{
          control: (base) => ({ ...base, minHeight: '2rem', fontSize: '0.75rem' }),
          menu: (base) => ({ ...base, fontSize: '0.75rem' }),
          multiValueLabel: (base) => ({ ...base, fontSize: '0.75rem' }),
        }}
      />
    </div>
  )
}
