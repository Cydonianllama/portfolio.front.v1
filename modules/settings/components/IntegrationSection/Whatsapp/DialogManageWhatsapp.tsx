/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { ListWhatsappIntegrations } from "./ListWhatsappIntegration"
import { useWhatsappIntegration } from "./store/store"

type DialogWhatsappIntegrationProps = {
  
}

export const DialogWhatsappIntegration = ({  } : DialogWhatsappIntegrationProps) => {
    const store = useWhatsappIntegration()

  const HandleToProcess = () => {
    
  }

  const HandleToCancel = () => {
    store.setOpenManage({ openManage: false })
  }

  return <>
    <Dialog open={store.openManage} onOpenChange={(open) => store.setOpenManage({ openManage: open })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de items.
          </DialogDescription>
        </DialogHeader>
        
        <ListWhatsappIntegrations />

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={false ? true : false} onClick={HandleToProcess}>
            {false && <Spinner data-icon="inline-start" />}
            Procces
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}