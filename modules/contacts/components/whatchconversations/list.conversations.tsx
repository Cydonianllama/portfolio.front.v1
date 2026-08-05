//
// compo - api - store
//

import { create } from "zustand";
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ResponsePagination } from "@/types/api/utils.pagination"
import { useEffect } from "react";
import { useAppData } from "@/hooks/app/useAppData";
import { toast } from "sonner";
import { UseManageConversationsHookActions } from "../../hooks/hook.actions.manage.conversations";
import { useWatchConversations } from "../../store/store.watch.conversations";

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const ListConversations = () => {

  const manageConversationsActions = UseManageConversationsHookActions({})
  const watchConversationStore =  useWatchConversations();

  const useAppData = useAppData()

  const ListItems = async () => {
    manageConversationsActions.GetContactConversationsAction({ contactId: watchConversationStore.contactOpened || '' })
  }

  const OnInit = () => {
    ListItems()
  }

  useEffect(() => {
    if(watchConversationStore.contactOpened) OnInit()
  }, [watchConversationStore.contactOpened])

  return <>
    {watchConversationStore.list.map((el, index) => <div key={index}>{el.name}</div>)}
  </>
}