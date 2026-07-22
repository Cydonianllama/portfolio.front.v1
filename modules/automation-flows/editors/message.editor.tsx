import { UseAppData } from "@/hooks/app/useAppData";
import { BaseEditor } from "./_base.editor";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MessageEditorProps = {

}

export const MessageEditor = ({ }: MessageEditorProps) => {
  const useAppData = UseAppData()

  return (
    <BaseEditor>

    </BaseEditor>
  )
}