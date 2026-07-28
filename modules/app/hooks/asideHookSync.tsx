import { eventBus } from "@/utils/eventBus"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { useAside } from "../stores/asideStore"
import { entityDTO } from "@/api/dataEngine/entity"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AsideSyncHookProps = {

}

export const UseAsideSyncHook = ({} : AsideSyncHookProps) => {
  const asideStore = useAside()

  // cuando se cree una entidad agregarla en el aside
  useEffect(() => {
    const OnEntityCreated = (entity: entityDTO) => {
      asideStore.setEntities([...asideStore.entities, entity])
    }

    eventBus.on('entityCreated', OnEntityCreated)
    return () => eventBus.off('entityCreated', OnEntityCreated)
  }, [asideStore.entities])

}