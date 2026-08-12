import { BaseEditor } from "./_base.editor";
import { Button } from "@/components/ui/button";
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { isRequestServiceNode } from "../utils/node.guards";
import { EditorRuntimeProps } from "../registry/types";

export const RequestServiceEditor = ({ node }: EditorRuntimeProps) => {
  const automationFlow = automationFlowGenStore()

  const nodeInformation = node
  const isNode = isRequestServiceNode(nodeInformation)
  const configuration = isNode ? nodeInformation.configuration : undefined

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-foreground">Detalle de la solicitud</div>
            <Button
              onClick={() => automationFlow.setRequestServiceEditor({ openRequestServiceEditor: true })}
              variant={'outline'}
              size={'icon-sm'}
            >
              {IconsCatalog.edit.Icon}
            </Button>
          </div>
          <div className="border rounded-lg p-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Método</span>
              <span className="font-medium">{configuration?.method || '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground shrink-0">URL</span>
              <span className="font-medium break-all text-right">{configuration?.url || '—'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-foreground">Headers</div>
          {configuration?.headers?.length ? (
            <div className="border rounded-lg divide-y">
              {configuration.headers.map((header, index) => (
                <div key={index} className="flex justify-between p-2 text-sm">
                  <span className="font-medium">{header.key || '—'}</span>
                  <span className="text-muted-foreground">{header.value || '—'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Sin headers configurados.</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-foreground">Body</div>
          {configuration?.body ? (
            <pre className="border rounded-lg p-2 text-xs whitespace-pre-wrap break-all bg-muted/30">
              {configuration.body}
            </pre>
          ) : (
            <p className="text-xs text-muted-foreground">Sin body configurado.</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-foreground">Mappers</div>
          {configuration?.mappers?.length ? (
            <div className="border rounded-lg divide-y">
              {configuration.mappers.map((mapper, index) => (
                <div key={index} className="flex justify-between p-2 text-sm">
                  <span className="font-medium">{mapper.path || '—'}</span>
                  <span className="text-muted-foreground">{mapper.saveId || '—'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Sin mappers configurados.</p>
          )}
        </div>
      </div>
    </BaseEditor>
  )
}
