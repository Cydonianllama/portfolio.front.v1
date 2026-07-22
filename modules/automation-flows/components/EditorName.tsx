import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EditorNameProps = {
  
}

export const EditorName = ({  }: EditorNameProps) => {
  const useAppData = UseAppData()

  return (
    <>
      Edition Name
    </>
  )
}