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
import { ListTelegramIntegrations } from "./ListTelegramIntegrations"
import { useTelegramIntegrations } from "./store/store"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DialogManageTelegramProps = {

}

export const DialogManageTelegram = ({ } : DialogManageTelegramProps) => {
  const store = useTelegramIntegrations()
  
  const HandleToProcess = () => {
    
  }

  const HandleToCancel = () => {
    store.setOpenManage({ openManage: false })
  }

  return <>
    <Dialog open={store.openManage} onOpenChange={(open) => store.setOpenManage({ openManage: open })}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Integración de Telegram</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        
        {/* content here */}
        <ListTelegramIntegrations />

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