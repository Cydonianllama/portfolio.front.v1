import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorFlowProps = {

}

export const EditorFlow = ({ }: EditorFlowProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="absolute top-0 bottom-0 w-80 bg-white border-r shadow z-10">
        
      </div>
    </>
  )
}