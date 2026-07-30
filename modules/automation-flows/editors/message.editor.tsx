import { UseAppData } from "@/hooks/app/useAppData";
import { BaseEditor } from "./_base.editor";
import { TextareaAutomation } from "../components/EditorUtilities/Texteditor";
import { ButtonsSection } from "./message-editor/buttonsSection";
import { ConectorsBottomSection } from "./message-editor/conectorsBottomSection";
import { GroupWordsSection } from "./message-editor/groupWordsSection";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessageEditorProps = {

}

export const MessageEditor = ({ }: MessageEditorProps) => {
  const useAppData = UseAppData()

  return (
    <BaseEditor>
      <div className="space-y-4">
        <TextareaAutomation />
        <GroupWordsSection />
        <ButtonsSection />
        <ConectorsBottomSection />
      </div>
    </BaseEditor>
  )
}