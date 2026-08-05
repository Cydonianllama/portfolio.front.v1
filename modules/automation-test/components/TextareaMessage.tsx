import { useAppData } from "@/hooks/app/useAppData";
import TextareaAutosize from "react-textarea-autosize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { useEffect, useState } from "react";
import { UseAutomationTestHookActions } from "../hooks/hook.action.automationtest";
import { useAutomationTest } from "../store/automation.test.store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TextareaMessageProps = {

}

export const TextareaMessage = ({ }: TextareaMessageProps) => {
  const appData = useAppData()
  const automationTestActions = UseAutomationTestHookActions({})
  const automationTestStore = useAutomationTest()

  const [text, setText] = useState('')

  const HandleSend = () => {
    automationTestActions.SendMessageTestContactAction({ roomId: automationTestStore.contactOpenedId || '', message: text })
    setText('')
  }

  return (
    <>
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton disabled={automationTestStore.sending ? true : false} onClick={HandleSend} className="ml-auto" size="sm" variant="default">
            Enviar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </>
  )
}