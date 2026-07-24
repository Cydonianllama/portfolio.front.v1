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
import { useAutomationFlow } from "../../store/automation.flow.store"

type DialogAddTriggerProps = {

}

export const DialogAddTrigger= ({  } : DialogAddTriggerProps) => {

  const automationFlowStore = useAutomationFlow()

  const HandleToProcess = () => {
    // onProccessing({})
  }

  const HandleToCancel = () => {
    automationFlowStore.setTriggerSelector({ openTriggerSelector: false })
  }

  return <>
    <Dialog open={automationFlowStore.openTriggerSelector} onOpenChange={(open) => { automationFlowStore.setTriggerSelector({ openTriggerSelector: open }) }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Selecciona el trigger a crear</DialogTitle>
          <DialogDescription></DialogDescription>
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