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
import { AddTriggerOptions } from "./AddTriggerOptions"

type DialogAddTriggerProps = {

}

export const DialogAddTrigger= ({  } : DialogAddTriggerProps) => {

  const HandleToProcess = () => {
    // onProccessing({})
  }

  const HandleToCancel = () => {
    // setOpen(false)
  }

  return <>
    <Dialog open={false} onOpenChange={(open) => {}}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de items.
          </DialogDescription>
        </DialogHeader>
        
        <AddTriggerOptions />

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