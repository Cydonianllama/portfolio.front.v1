import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonEditProps = {
  
}

export const ButtonEdit = ({  }: ButtonEditProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <Button>
        Ediar
      </Button>
    </>
  )
}