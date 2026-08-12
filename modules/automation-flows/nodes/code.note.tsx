import { BaseNode } from "./_base.node";
import { isCodeNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

export function CodeNode({ data, definition, getNodeConfiguration }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()

  const isNode = isCodeNode(nodeInformation)
  const content = isNode ? nodeInformation.configuration?.content || '' : ''
  const scriptL = isNode ? nodeInformation.configuration?.scriptL || 'js' : 'js'
  const firstLines = content.split('\n').filter(el => el.trim().length > 0).slice(0, 3)

  return (
    <>
      <BaseNode
        id={String(data?.id) || ''}
        color={definition.visual.color}
        Icon={definition.visual.icon}
        title={definition.visual.title}
        description={definition.visual.description}
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
