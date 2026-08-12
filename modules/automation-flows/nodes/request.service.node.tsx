import { BaseNode } from "./_base.node";
import { isRequestServiceNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

export function RequestServiceNode({ data, definition, getNodeConfiguration }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()

  const isNode = isRequestServiceNode(nodeInformation)
  const configuration = isNode ? nodeInformation.configuration : undefined

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
        config={{ hasSource: true, hasTarget: true }}
      >
        <div className="max-w-[200px] pt-2 space-y-2">
          <div className="flex items-center gap-1.5 p-1.5 border rounded-lg text-xs">
            <span className="font-semibold text-blue-500 shrink-0">{configuration?.method || 'POST'}</span>
            <span className="text-muted-foreground truncate">{configuration?.url || 'Sin URL configurada'}</span>
          </div>
          {configuration?.headers?.length ? (
            <div className="text-xs text-muted-foreground">
              {configuration.headers.length} header{configuration.headers.length === 1 ? '' : 's'}
            </div>
          ) : null}
          {configuration?.mappers?.length ? (
            <div className="text-xs text-muted-foreground">
              {configuration.mappers.length} mapper{configuration.mappers.length === 1 ? '' : 's'}
            </div>
          ) : null}
        </div>
      </BaseNode>
    </>
  );
}
