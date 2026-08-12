import { BaseEditor } from "./_base.editor";
import { TextareaAutomation } from "../components/EditorUtilities/Texteditor";
import { ButtonsSection } from "./message-editor/buttonsSection";
import { ConectorsBottomSection } from "./message-editor/conectorsBottomSection";
import { ExpectedResponseSection } from "./message-editor/expectedResponseSection";
import { GroupWordsSection } from "./message-editor/groupWordsSection";
import { useMessageEditorActions } from "../hooks/useMessageEditorActions";
import { isMessageNode } from "../utils/node.guards";
import { EditorRuntimeProps } from "../registry/types";

export const MessageEditor = ({ node }: EditorRuntimeProps) => {
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = node

  const isNode = isMessageNode(nodeInformation)

  return (
    <BaseEditor>
      <div className="space-y-4">
        <TextareaAutomation
          value={isNode ? nodeInformation.configuration?.message || '' : ''}
          onUpdate={(val) => {
            if (isNode) {
              UpdateMessageConfiguration('updateMessage', nodeInformation, {
                text: val
              })
            } else {
              console.log({ nodeInformation })
            }
          }}
        />
        {isNode && (
          <>
            <ExpectedResponseSection node={nodeInformation} />
            <GroupWordsSection node={nodeInformation} />
            <ButtonsSection node={nodeInformation} />
            <ConectorsBottomSection node={nodeInformation} />
          </>
        )}
      </div>
    </BaseEditor>
  )
}
