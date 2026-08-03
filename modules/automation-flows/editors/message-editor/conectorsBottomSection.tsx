import { UseAppData } from "@/hooks/app/useAppData";
import { EmptyState } from "../../components/states/EmptyState";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ConectorsBottomSectionProps = {

}

export const ConectorsBottomSection = ({ }: ConectorsBottomSectionProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const configuration = nodeInformation?.configuration

  const notResponseConnected = Boolean(configuration?.notResponseNextNode)
  const otherResponseConnected = Boolean(configuration?.otherResponseNextNode)

  return (
    <div className="space-y-2">
      <div className="font-semibold text-foreground">Conexiones especiales</div>
      <div className="space-y-2">
        <div className="border rounded-lg p-3 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Si no responde</div>
            <span
              className={`h-2.5 w-2.5 rounded-full ${notResponseConnected ? 'bg-green-500' : 'bg-amber-400'}`}
              title={notResponseConnected ? 'Conectado' : 'Sin conexión'}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {notResponseConnected ? 'Conectado a un nodo siguiente' : 'Conecta este puerto a un nodo en el canvas'}
          </p>
        </div>
        <div className="border rounded-lg p-3 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Respuesta no esperada</div>
            <span
              className={`h-2.5 w-2.5 rounded-full ${otherResponseConnected ? 'bg-green-500' : 'bg-amber-400'}`}
              title={otherResponseConnected ? 'Conectado' : 'Sin conexión'}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {otherResponseConnected ? 'Conectado a un nodo siguiente' : 'Conecta este puerto a un nodo en el canvas'}
          </p>
        </div>
        <EmptyState
          title="Conecta los puertos en el canvas"
          description="Los puertos de conexión especial se arrastran desde el nodo hacia otro nodo."
        />
      </div>
    </div>
  )
}
