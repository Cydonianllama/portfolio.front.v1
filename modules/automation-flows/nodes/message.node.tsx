import {
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { ExpectedResponseType, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, nodeTypes } from "@erick/conversationalflow";
import { SectionGroupWords } from "./message-node/sectionGroupWords";
import { SectionButtons } from "./message-node/sectionButtonts";
import { useAutomationNode } from "../hooks/useAutomationNode";
import { isMessageNode } from "../utils/node.guards";

const EXPECTED_RESPONSE_LABEL: Record<ExpectedResponseType, string> = {
  none: 'Sin respuesta',
  text: 'Texto',
  button: 'Botón',
  file: 'Archivo',
  image: 'Imagen',
  voice: 'Voz',
  video: 'Video',
}

export function MessageNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_GENERAL_MESSAGE_SIMPLE

  const { getNodeConfiguration } = useAutomationNode(String(data.id))
  const nodeInformation = getNodeConfiguration()

  const isNode = isMessageNode(nodeInformation)
  
  const message = isNode ? nodeInformation.configuration?.message || '' : ''
  const expectedResponse: ExpectedResponseType = isNode ? (nodeInformation.configuration?.expectedResponse || 'none') : 'none'
  const groupWordsCount = isNode ? nodeInformation.configuration?.groupWords?.length || 0 : 0
  const buttonsCount = isNode ? nodeInformation.configuration?.buttons?.length || 0 : 0

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        <div className="max-w-[220px] pt-2 space-y-3">
          {/* Mensaje */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              Mensaje
            </div>
            <div className={`p-2 rounded-lg text-xs text-white ${message ? 'bg-blue-500' : 'bg-blue-500/50 border border-dashed border-blue-300'}`}>
              {message || 'Sin mensaje configurado'}
            </div>
          </div>

          {/* Respuesta esperada */}
          <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Espera:</span>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-foreground">
              {EXPECTED_RESPONSE_LABEL[expectedResponse]}
            </span>
          </div>

          {/* Palabras / grupos */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                Palabras
              </div>
              {groupWordsCount > 0 && (
                <span className="inline-flex items-center rounded-full border bg-mist-50 px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground tabular-nums">
                  {groupWordsCount}
                </span>
              )}
            </div>
            {groupWordsCount > 0 ? (
              <div className="rounded-md border border-gray-200 bg-gray-50/60 p-1.5">
                {isNode && <SectionGroupWords node={nodeInformation} />}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-muted-foreground">
                Sin palabras clave
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Botones
              </div>
              {buttonsCount > 0 && (
                <span className="inline-flex items-center rounded-full border bg-mist-50 px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground tabular-nums">
                  {buttonsCount}
                </span>
              )}
            </div>
            {buttonsCount > 0 ? (
              <div className="rounded-md border border-gray-200 bg-gray-50/60 p-1.5">
                {isNode && <SectionButtons node={nodeInformation} />}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-muted-foreground">
                Sin botones
              </div>
            )}
          </div>

          {/* Conexiones especiales */}
          <div className="space-y-1 border-t border-gray-200 pt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground relative">
              <span>Si no responde</span>
              <Handle
                id={`not-response-${data.id}`}
                type="source"
                position={Position.Right}
                style={{
                  right: -10,
                  width: 12,
                  height: 12,
                  background: "#f59e0b",
                  border: "2px solid white",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground relative">
              <span>Respuesta no esperada</span>
              <Handle
                id={`other-response-${data.id}`}
                type="source"
                position={Position.Right}
                style={{
                  right: -10,
                  width: 12,
                  height: 12,
                  background: "#ef4444",
                  border: "2px solid white",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
      </BaseNode>
    </>
  );
}
