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

type DialogNameProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProccessing: (data: any) => void
  open: boolean
  setOpen: (open: boolean) => void
  proccesing?: boolean;
}

export const DialogName = ({ onProccessing, open, setOpen, proccesing, } : DialogNameProps) => {

  const HandleToProcess = () => {
    onProccessing({})
  }

  const HandleToCancel = () => {
    setOpen(false)
  }

  return <>
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de items.
          </DialogDescription>
        </DialogHeader>
        
        {/* content here */}
        Content - Here

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={proccesing ? true : false} onClick={HandleToProcess}>
            {proccesing && <Spinner data-icon="inline-start" />}
            Procces
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}