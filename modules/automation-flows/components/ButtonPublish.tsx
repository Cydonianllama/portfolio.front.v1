import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonPublishProps = {
  
}

export const ButtonPublish = ({  }: ButtonPublishProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <Button variant={'default'}>
        Publicar
      </Button>
    </>
  )
}