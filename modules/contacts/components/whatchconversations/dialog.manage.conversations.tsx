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
import { useWatchConversations } from "../../store/store.watch.conversations"
import { ListConversations } from "./list.conversations"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DialogManageConversationsProps = {

}

export const DialogManageConversations = ({ }: DialogManageConversationsProps) => {
  const watchConversationsStore = useWatchConversations()


  const HandleToProcess = () => {
    //
  }

  const HandleToCancel = () => {
    watchConversationsStore.setGeneral({ open: false })
  }

  return <>
    <Dialog open={watchConversationsStore.open} onOpenChange={(open) => watchConversationsStore.setGeneral({ open: open })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Administrar conversaciones del contacto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <ListConversations />

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          {/* <Button disabled={proccesing ? true : false} onClick={HandleToProcess}>
            {proccesing && <Spinner data-icon="inline-start" />}
            Procces
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}