import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { RuleItem } from "./ruleItem";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type RuleSectionProps = {
  node: IAutomationNode<typeof NODE_TYPE_CONDITION>
}

export function RuleSection({ node }: RuleSectionProps) {

  return (<>
    <div className="space-y-2">
      {node.configuration?.rules?.length ? (
        node.configuration?.rules?.map((el) => (
          <RuleItem key={el.id || el.nextNode} node={node} ruleId={el.id} />
        ))
      ) : (
        <></>
      )}
    </div>
  </>)
}
