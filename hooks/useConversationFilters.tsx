/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateConversationFilterRequestDTO, GetConversationsFilterRequestDTO } from "@/api/conversationFilter/conversation.filter.dto"
import { CreateConversationFilter, GetConversationFilters } from "@/api/conversationFilter/convesation.filter.api"
import { useCoversationFiltersStore } from "@/modules/chat/store/store.conversationFilters";
import { useCallback } from "react"

export const UseConversationFilters = () => {

  const conversationFiltersStore = useCoversationFiltersStore();

  const ListConversationFiltersAction = useCallback(async (data: GetConversationsFilterRequestDTO) => {
    try {
      conversationFiltersStore.setStates({ loadingFilters: true, isError: false, errorList: '' })
      const req = await GetConversationFilters(data)
      if (!req) {
        return;
      }

      if (!req?.status) {
        return;
      }

      if (!req?.data) {
        return;
      }

      conversationFiltersStore.setStates({ listConvesationFilters: req.data.list, paginationFilters: req.pagination || null })

    } catch (error: any) {
      conversationFiltersStore.setStates({ isError: true, errorList: error.message || '' })
    } finally {
      conversationFiltersStore.setStates({ loadingFilters: false })
    }
  }, [])

  const CreateConversationFilterAction = useCallback(async (data: CreateConversationFilterRequestDTO) => {
    try {
      conversationFiltersStore.setCreation({ creatingFilter: true, successCreation: false })
      const req = await CreateConversationFilter(data)
      if (!req){
        return;
      }

      if (!req.status){
        return;
      }

      if (!req.data?.conversationFilter){
        return;
      }

      conversationFiltersStore.setCreation({ successCreation: true })

    } catch (error) {
      
    } finally {
      conversationFiltersStore.setCreation({ creatingFilter: false })
    }
  }, [])

  return {
    ListConversationFiltersAction,
    CreateConversationFilterAction,
  }

}