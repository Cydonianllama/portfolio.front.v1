import {
  NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./_base.node";
import { GeneralConfigurationNode } from "../_configs";
import { IAutomationNode, nodeTypes, NODE_TYPE_CODE } from "@erick/conversationalflow";
import { useAutomationNode } from "../hooks/useAutomationNode";

export function CodeNode({ data }: NodeProps) {
  const type = nodeTypes.NODE_TYPE_CODE
  const { getNodeConfiguration } = useAutomationNode(String(data?.id) || '')
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_CODE> | undefined;

  const content = nodeInformation?.configuration?.content || ''
  const scriptL = nodeInformation?.configuration?.scriptL || 'js'
  const firstLines = content.split('\n').filter(el => el.trim().length > 0).slice(0, 3)

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
        <div className="pt-2">
          <div className="text-[10px] text-muted-foreground mb-0.5">{scriptL == 'python' ? 'Python' : 'JavaScript'}</div>
          {firstLines.length ? (
            <pre className="text-[10px] font-mono whitespace-pre-wrap max-h-20 overflow-hidden">{firstLines.join('\n')}</pre>
          ) : (
            <div className="text-[10px] text-muted-foreground">Sin código</div>
          )}
        </div>
      </BaseNode>
    </>
  );
}
