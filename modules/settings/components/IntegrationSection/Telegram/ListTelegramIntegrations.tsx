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
import { useTelegramIntegrations } from "./store/store";
import { UseTelgramIntegrationsHookActions } from "./hooks/hook.telegram.actions";
import { TelegramItem } from "./TelegramItem";

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const ListTelegramIntegrations = () => {
  const store = useTelegramIntegrations()
  const useAppData = useAppData()
  const telegramActions = UseTelgramIntegrationsHookActions({})


  const OnInit = () => {
    telegramActions.GetIntegrationsTelegramAction()
  }

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    {store.list.map((el, index) => <TelegramItem key={index} data={el} />)}
  </>
}

