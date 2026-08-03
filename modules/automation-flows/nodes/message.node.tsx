import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { ExpectedResponseType, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, nodeTypes } from "@erick/conversationalflow";
import { SectionGroupWords } from "./message-node/sectionGroupWords";
import { SectionButtons } from "./message-node/sectionButtonts";
import { useAutomationNode } from "../hooks/useAutomationNode";

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
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const expectedResponse = nodeInformation?.configuration?.expectedResponse || 'none'

  return (
    <>
      {/* <NodeResizer minWidth={180} minHeight={100} /> */}
      <BaseNode
        id={String(data?.id) || ''}
        color={GeneralConfigurationNode[type].color}
        Icon={GeneralConfigurationNode[type].icon}
        title={GeneralConfigurationNode[type].title}
        description={GeneralConfigurationNode[type].description}
        config={{ hasSource: true, hasTarget: true }}
      >
        <div className="max-w-[200px] pt-2 space-y-4">
          <div className="p-2 rounded-lg text-xs text-muted-foreground text-white bg-blue-500">
            {nodeInformation?.configuration?.message || ''}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Espera:</span>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium">
              {EXPECTED_RESPONSE_LABEL[expectedResponse]}
            </span>
          </div>
          
          <SectionGroupWords id={String(data.id)} />
          <SectionButtons id={String(data.id)} />

          <div className="space-y-1 border-t pt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground relative">
              <span>Si no responde</span>
              {/* <span
                className={`h-2 w-2 rounded-full ${nodeInformation?.configuration?.notResponseNextNode ? 'bg-green-500' : 'bg-amber-400'}`}
              /> */}
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
              {/* <span
                className={`h-2 w-2 rounded-full ${nodeInformation?.configuration?.otherResponseNextNode ? 'bg-green-500' : 'bg-amber-400'}`}
              /> */}
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