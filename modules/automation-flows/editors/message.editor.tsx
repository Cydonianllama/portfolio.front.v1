import { UseAppData } from "@/hooks/app/useAppData";
import { BaseEditor } from "./_base.editor";
import { TextareaAutomation } from "../components/EditorUtilities/Texteditor";
import { ButtonsSection } from "./message-editor/buttonsSection";
import { ConectorsBottomSection } from "./message-editor/conectorsBottomSection";
import { GroupWordsSection } from "./message-editor/groupWordsSection";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useAutomationEditor } from "../hooks/useAutomationEditor";
import { useMessageEditorActions } from "../hooks/useMessageEditorActions";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessageEditorProps = {

}

export const MessageEditor = ({ }: MessageEditorProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  return (
    <BaseEditor>
      <div className="space-y-4">
        <TextareaAutomation
          value={nodeInformation?.configuration?.message || ''}
          onUpdate={(val) => { 
            UpdateMessageConfiguration('updateMessage', nodeInformation, {
              text: val
            })
          }}
        />
        <GroupWordsSection />
        <ButtonsSection />
        <ConectorsBottomSection />
      </div>
    </BaseEditor>
  )
}