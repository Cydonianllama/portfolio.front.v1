import { UseAppData } from "@/hooks/app/useAppData";
import { BaseEditor } from "./_base.editor";
import { useAutomationFlow } from "../store/automation.flow.store";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessageEditorProps = {

}

export const RequestServiceEditor = ({ }: MessageEditorProps) => {
  const useAppData = UseAppData()

  const automationFlow = useAutomationFlow()

  return (
    <BaseEditor>
    </BaseEditor>
  )
}