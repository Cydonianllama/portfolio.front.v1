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
import { TestAutomationChat } from "./TestAutomationChat"
import { useAutomationTest } from "../store/automation.test.store"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DialogAutomationTestProps = {

}

export const DialogAutomationTest = ({ } : DialogAutomationTestProps) => {
  const automationTestStore = useAutomationTest()

  const HandleToProcess = () => {
    // onProccessing({})
  }

  const HandleToCancel = () => {
    automationTestStore.setState({ openChat: false })
  }

  return <>
    <Dialog open={automationTestStore.openChat} onOpenChange={(open) => automationTestStore.setState({ openChat: open })}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Chat de test</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TestAutomationChat />
      </DialogContent>
    </Dialog>
  </>
}