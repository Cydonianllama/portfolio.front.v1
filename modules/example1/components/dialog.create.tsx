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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface ManagerV1DialogCreateConfig {
  onCreate: () => void
  open: boolean
  setOpen: (open: boolean) => void
}

export const ManagerV1DialogCreate = (config: ManagerV1DialogCreateConfig) => {
  
  const HandleToCreate = () => {
    config.onCreate()
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      {/* 
          <DialogTrigger>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger> 
        */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de item.s
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
          </Field>
          <Field>
            <Label htmlFor="username-1">Username</Label>
            <Input id="username-1" name="username" defaultValue="@peduarte" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button onClick={HandleToCreate}>Crear item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}