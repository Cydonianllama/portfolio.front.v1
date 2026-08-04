import { BaseEditor } from "./_base.editor";
import { RuleSection } from "./condition-editor/rulesSection";
import { useAutomationEditor } from "../hooks/useAutomationEditor";
import { isConditionNode } from "../utils/node.guards";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ConditionEditorProps = {

}

export const ConditionEditor = ({ }: ConditionEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const nodeInformation = GetAutomationNodeInformation()
  const isNode = isConditionNode(nodeInformation)

  return (
    <BaseEditor>
      {isNode && <RuleSection node={nodeInformation} />}
    </BaseEditor>
  )
}
