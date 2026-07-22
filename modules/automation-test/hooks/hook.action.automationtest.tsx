import { useCallback } from "react"
import { toast } from "sonner"
import { CreateContactTestAutomation, CreateContactTestAutomationRequestDTO } from "../services/create.contact"
import { DeleteContactTestAutomation, DeleteContactTestAutomationRequestDTO } from "../services/delete.contact"
import { GetContactsTestAutomation, GetContactsTestAutomationRequestDTO } from "../services/get.contacts"
import { GetMessagesTestContact, GetMessagesTestContactRequestDTO } from "../services/get.messages"
import { SendMessageTestAutomation, SendMessageTestAutomationRequestDTO } from "../services/send.message"
import { useAutomationTest } from "../store/automation.test.store"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationTestHookActionsProps = {

}

export const UseAutomationTestHookActions = ({} : AutomationTestHookActionsProps) => {

  const automationTestStore = useAutomationTest()

  const CreateTestContactAction = useCallback(async (data: CreateContactTestAutomationRequestDTO) => {
    try {
      automationTestStore.setCreateState({ creating: true })
      const req = await CreateContactTestAutomation(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
      if (req.data.room) automationTestStore.setListState({ list: [...automationTestStore.list, req.data.room] })
  
    } catch (ex) {
  
    } finally {
      automationTestStore.setCreateState({ creating: true })
    }
  }, [automationTestStore.list])

  const DeleteTestContactAction = useCallback(async (data: DeleteContactTestAutomationRequestDTO) => {
    try {
      const req = await DeleteContactTestAutomation(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
  
    } catch (ex) {
  
    } finally {
  
    }
  }, [])


  const GetTestContactsAction = useCallback(async (data: GetContactsTestAutomationRequestDTO) => {
    try {
      automationTestStore.setListState({ listing: false })

      const req = await GetContactsTestAutomation(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
      automationTestStore.setListState({ list: req.data.list || [] })
      
  
    } catch (ex) {
  
    } finally {
      automationTestStore.setListState({ listing: false })
    }
  }, [])


  const GetTestMessagesFromContatAction = useCallback(async (data: GetMessagesTestContactRequestDTO) => {
    try {
      automationTestStore.setListStateMessages({ listingMessages: true })
      const req = await GetMessagesTestContact(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
  
      automationTestStore.setListStateMessages({ listMessages: req.data.list || [] })
  
    } catch (ex) {
  
    } finally {
      automationTestStore.setListStateMessages({ listingMessages: false })
    }
  }, [automationTestStore.contactOpenedId])

  const SendMessageTestContactAction = useCallback(async (data: SendMessageTestAutomationRequestDTO) => {
    try {
      automationTestStore.setSend({ sending: true })
      const req = await SendMessageTestAutomation(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
  
      if (req.data.message) automationTestStore.setListStateMessages({ listMessages: [...automationTestStore.listMessages, req.data.message] })
  
  
    } catch (ex) {
  
    } finally {
      automationTestStore.setSend({ sending: false })
    }
  }, [automationTestStore.contactOpenedId, automationTestStore.listMessages])

  const OpenChatAction = useCallback(async (roomId: string) => {
    try {
      automationTestStore.setState({ contactOpenedId: roomId })

      await GetTestMessagesFromContatAction({ roomId: roomId })

    } catch (ex) {
  
    } finally {
      
    }
  }, [])

  return {
    CreateTestContactAction,
    DeleteTestContactAction,
    GetTestContactsAction,
    GetTestMessagesFromContatAction,
    SendMessageTestContactAction,
    OpenChatAction
  }
}