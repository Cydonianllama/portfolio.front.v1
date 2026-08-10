import { eventBus } from "@/utils/eventBus"
import { useEffect } from "react"
import { useAside } from "../stores/asideStore"
import { entityDTO } from "@/api/dataEngine/entity"

type AsideSyncHookProps = {}

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