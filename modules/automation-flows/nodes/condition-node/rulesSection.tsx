import { IAutomationNode, NODE_TYPE_CONDITION } from "@erick/conversationalflow";
import { useAutomationNode } from "../../hooks/useAutomationNode";
import { RuleItem } from "./ruleItem";
import { EmptyState } from "../../components/states/EmptyState";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type RuleSectionProps = {
  id: string
}

export function RuleSection({ id }: RuleSectionProps) {

  const { getNodeConfiguration } = useAutomationNode(String(id))
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_CONDITION>;

  return (<>
    <div className="space-y-2">
      {nodeInformation?.configuration?.rules?.length ? (
        nodeInformation?.configuration?.rules?.map((el, index) => (
          <RuleItem key={index} id={id} ruleId={el.id} />
        ))
      ) : (
        <EmptyState title="Sin reglas" />
      )}
    </div>
  </>)
}