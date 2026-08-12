/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AddTriggerOptions } from "./AddTriggerOptions"
import { automationFlowGenStore } from "../../store/automation.flow.store"
import { CatalogTrigger } from "../../catalogs/catalogTriggers"
import { useState } from "react"

type DialogAddTriggerProps = {

}

export const DialogAddTrigger = ({  } : DialogAddTriggerProps) => {

  const automationFlowStore = automationFlowGenStore()

  const [selectedOption, setSelectedOption] = useState<CatalogTrigger | null>(null)

  const HandleToCancel = () => {
    automationFlowStore.setTriggerSelector({ openTriggerSelector: false })
    setSelectedOption(null)
  }

  return <>
    <Dialog open={automationFlowStore.openTriggerSelector} onOpenChange={(open) => { 
      automationFlowStore.setTriggerSelector({ openTriggerSelector: open })
      if (!open) setSelectedOption(null)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedOption ? 'Configura el trigger' : 'Selecciona el trigger a crear'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        
        <div className="max-h-90 overflow-auto space-y-2">
          <AddTriggerOptions onSelect={setSelectedOption} selectedOption={selectedOption} />
        </div>

        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
