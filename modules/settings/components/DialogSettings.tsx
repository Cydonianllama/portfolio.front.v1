/* eslint-disable @typescript-eslint/no-empty-object-type */
// components
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
import { useSettingsStore } from "../store/settingsStore"
import { Settings } from "./Settings"

export interface DialogSettingsConfig {

}

export const DialogSettings = (config: DialogSettingsConfig) => {

  const settings = useSettingsStore()

  return (<>
    <Dialog open={settings.open} onOpenChange={(open) => settings.setOpen(open)}>
      <DialogContent showCloseButton={false} className="sm:max-w-5xl">
        {/* <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader> */}
        <div className="min-h-180">
          <Settings />
        </div>
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => { settings.setOpen(false) }}>Cancelar</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  </>)
}