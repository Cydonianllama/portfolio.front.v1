/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { useEffect } from "react";
import { UseAutomationTestHookActions } from "../hooks/hook.action.automationtest";
import { useAutomationTest } from "../store/automation.test.store";
import { Button } from "@/components/ui/button";
import { TextareaMessage } from "./TextareaMessage";
import { MessagesCard } from "./MessagesCard";
import { RoomCardTest } from "./ContactCard";


type TestAutomationChatProps = {

}

export const TestAutomationChat = ({ }: TestAutomationChatProps) => {
  const appData = useAppData()
  const testAutomationActions = UseAutomationTestHookActions({})
  const automationTestStore = useAutomationTest()

  useEffect(() => {
    if (appData.workspace) {
      testAutomationActions.GetTestContactsAction({ workspaceId: appData.workspace.id || '' })
    }
  }, [appData.workspace])

  const OnClickAddContact = () => {
    testAutomationActions.CreateTestContactAction({ name: 'Test contact', workspaceId: appData.workspace?.id || '' })
  }

  const HandleCloseChat = () => {
    automationTestStore.setState({ contactOpenedId: null })
  }

  return (
    <>
      <div className="flex h-140">
        <div className="w-40 h-full">
          listdo de contactos
          <div className="flex justify-between items-center">
            <Button variant={'outline'} onClick={OnClickAddContact}>Agregar</Button>
          </div>
          <div className="space-y-2">
            {automationTestStore.list.map((el, index) => <RoomCardTest data={el} key={index} />)}
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col pl-2">
          {automationTestStore.contactOpenedId && (<>
            <div>
              <Button variant={'outline'} onClick={HandleCloseChat}>Cerrar</Button>
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              listado de mensajes
              {automationTestStore.listMessages.map((el, index) => <MessagesCard key={index} data={el} />)}
            </div>
            <div className="h-30">
              <TextareaMessage />
            </div>
          </>)}

          {!automationTestStore.contactOpenedId && (<>
            Abrir un chat
          </>)}

        </div>
      </div>
    </>
  )
}