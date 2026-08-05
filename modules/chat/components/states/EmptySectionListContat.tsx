import { FiInbox } from "react-icons/fi"

export const EmptySectionListContacts = () => {
  return (<>
    <div className="h-full flex flex-col justify-center items-center text-muted-foreground gap-2 px-4">
      <FiInbox className="text-gray-300 text-4xl" />
      <p className="text-sm font-medium">No hay conversaciones</p>
      <p className="text-xs text-center">Las conversaciones de este filtro aparecerán aquí.</p>
    </div>
  </>)
}
