import { UseAppData } from "@/hooks/app/useAppData";
import { EditorsConfiguration } from "../_configs";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorFlowProps = {

}

export const EditorFlow = ({ }: EditorFlowProps) => {
  const useAppData = UseAppData()

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const Editor = EditorsConfiguration["trigger-node"].Editor;

  return (
    <>
      <div className="absolute top-0 bottom-0 w-80 bg-white border-r shadow z-10">
        <Editor />
      </div>
    </>
  )
}