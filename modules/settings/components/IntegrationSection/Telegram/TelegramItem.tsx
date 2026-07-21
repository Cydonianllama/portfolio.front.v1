import { IntegrationDTO } from "@/api/integration/integration.dto";
import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"

type TelegramItemProps = {
  data: IntegrationDTO
}

export const TelegramItem = ({ data }: TelegramItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      {data.alias}
      <div>
        <Button>
          Eliminar
        </Button>
      </div>
    </>
  )
}