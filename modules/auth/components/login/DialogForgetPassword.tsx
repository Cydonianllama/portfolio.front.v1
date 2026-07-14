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
import { FormForgetPassword, RequestForgetPasswordSchema } from "./FormForgetPassword"
import { useLogin } from "./store.login"

type DialogForgetPasswordProps = {
  handleForgetPass: (data: RequestForgetPasswordSchema) => void
}

export const DialogForgetPassword= ({ handleForgetPass } : DialogForgetPasswordProps) => {

  const loginStore = useLogin()

  return <>
    <Dialog open={loginStore.open} onOpenChange={(open) => loginStore.setState({ open })}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Olvidate tu contraseña pesuñento</DialogTitle>
          <DialogDescription>
            Porfavo ingresa tu email para validar.
          </DialogDescription>
        </DialogHeader>
        <FormForgetPassword  handleForgetPass={handleForgetPass} />
      </DialogContent>
    </Dialog>
  </>
}