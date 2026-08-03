import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { IAutomationNode, nodeTypes, NODE_TYPE_NOTE } from "@erick/conversationalflow";
import { useAutomationNode } from "../hooks/useAutomationNode";

const noteColorClass: Record<string, string> = {
  yellow: 'bg-yellow-50 border-yellow-300',
  blue: 'bg-blue-50 border-blue-300',
  green: 'bg-green-50 border-green-300',
  gray: 'bg-gray-50 border-gray-300',
  red: 'bg-red-50 border-red-300',
  purple: 'bg-purple-50 border-purple-300',
  orange: 'bg-orange-50 border-orange-300',
  sky: 'bg-sky-50 border-sky-300',
}

export function NoteNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_NOTE
  const { getNodeConfiguration } = useAutomationNode(String(data?.id) || '')
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_NOTE> | undefined;

  const content = nodeInformation?.configuration?.content || ''
  const color = nodeInformation?.configuration?.color || 'yellow'

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
        <div className={`pt-2 rounded border px-2 py-1.5 ${noteColorClass[color] || noteColorClass.yellow}`}>
          {content ? (
            <p className="text-[10px] whitespace-pre-wrap max-h-24 overflow-y-auto">{content}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">Nota vacía</p>
          )}
        </div>
      </BaseNode>
    </>
  );
}
