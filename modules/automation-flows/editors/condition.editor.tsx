import { BaseEditor } from "./_base.editor";
import { RuleSection } from "./condition-editor/rulesSection";
import { isConditionNode } from "../utils/node.guards";
import { EditorRuntimeProps } from "../registry/types";

export const ConditionEditor = ({ node }: EditorRuntimeProps) => {
  const nodeInformation = node
  const isNode = isConditionNode(nodeInformation)

  return (
    <BaseEditor>
      {isNode && <RuleSection node={nodeInformation} />}
    </BaseEditor>
  )
}
