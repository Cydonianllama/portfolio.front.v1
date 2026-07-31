import { UseAppData } from "@/hooks/app/useAppData";
import { BaseEditor } from "./_base.editor";
import { RuleSection } from "./condition-editor/rulesSection";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ConditionEditorProps = {

}

export const ConditionEditor = ({ }: ConditionEditorProps) => {
  const useAppData = UseAppData()

  return (
    <BaseEditor>
      <RuleSection />
    </BaseEditor>
  )
}