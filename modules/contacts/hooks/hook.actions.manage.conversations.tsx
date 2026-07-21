import { GetContactConversations, GetContactConversationsRequestDTO } from "@/api/contacts/get.contact.conversations"
import { useCallback } from "react"
import { toast } from "sonner"
import { useWatchConversations } from "../store/store.watch.conversations"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ManageConversationsHookActionsProps = {

}

export const UseManageConversationsHookActions = ({} : ManageConversationsHookActionsProps) => {

  const watchConversationsStore = useWatchConversations()

  const GetContactConversationsAction = useCallback(async (data: GetContactConversationsRequestDTO) => {
    try {
      watchConversationsStore.setListState({ listing: true })

      const req = await GetContactConversations(data)
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
      
      watchConversationsStore.setListState({ list: req.data.list || [] })
      
  
    } catch (ex) {
      toast.error('Error inesperado')
    } finally {
      watchConversationsStore.setListState({ listing: false })
    }
  }, [])

  return {
    GetContactConversationsAction
  }
}