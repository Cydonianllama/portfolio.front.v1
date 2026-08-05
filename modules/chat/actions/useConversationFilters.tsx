/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateConversationFilterRequestDTO, DeleteConversationFilterRequestDTO, GetConversationsFilterRequestDTO, GetConversationsFilterResponseDTO, UpdateConversationFilterRequestDTO } from "@/api/conversationFilter/conversation.filter.dto"
import { CreateConversationFilter, DeleteConversationFilter, GetConversationFilters, UpdateConversationFilter } from "@/api/conversationFilter/convesation.filter.api"
import { useCoversationFiltersStore } from "@/modules/chat/store/store.conversationFilters";
import { ResponseApi } from "@/types/api/response";
import { useCallback } from "react"

export const useConversationFiltersActions = () => {

  const conversationFiltersStore = useCoversationFiltersStore();

  const ListConversationFiltersAction = useCallback(async (data: GetConversationsFilterRequestDTO): Promise<ResponseApi<GetConversationsFilterResponseDTO> | null> => {
    try {
      if (data.page == 1) {
        conversationFiltersStore.setStates({ paginationFilters: null, listConvesationFilters: [] })
      }
      conversationFiltersStore.setStates({ loadingFilters: true, isError: false, errorList: '' })
      const req = await GetConversationFilters(data)
      if (!req) {
        return null;
      }

      if (!req?.status) {
        return null;
      }

      if (!req?.data) {
        return null;
      }
      conversationFiltersStore.setStates({ listConvesationFilters: req.data.list, paginationFilters: req.pagination || null })
      return req;
    } catch (error: any) {
      conversationFiltersStore.setStates({ isError: true, errorList: error.message || '' })
      return null;
    } finally {
      conversationFiltersStore.setStates({ loadingFilters: false })
    }
  }, [])

  const CreateConversationFilterAction = useCallback(async (data: CreateConversationFilterRequestDTO) => {
    try {
      conversationFiltersStore.setCreation({ creatingFilter: true, successCreation: false })
      const req = await CreateConversationFilter(data)
      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      if (!req.data?.conversationFilter) {
        return;
      }
      conversationFiltersStore.setStates({ listConvesationFilters: [...conversationFiltersStore.listConvesationFilters, req.data.conversationFilter] })
      conversationFiltersStore.setCreation({ successCreation: true })

    } catch (error) {

    } finally {
      conversationFiltersStore.setCreation({ creatingFilter: false })
      conversationFiltersStore.setDialogs({ creationDialogOpen: false })
    }
  }, [conversationFiltersStore.listConvesationFilters])

  const UdpateConversationFilterAction = useCallback(async (data: UpdateConversationFilterRequestDTO) => {
    try {
      conversationFiltersStore.setUpdate({ updating: true, successUpdating: false })
      const req = await UpdateConversationFilter(data)

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      if (!req.data?.conversationFilter) {
        return;
      }

      let items = [...conversationFiltersStore.listConvesationFilters]

      items = items.map((el) => {
        if (el.id == req.data.conversationFilter?.id) {
          return req.data.conversationFilter
        } else {
          return el;
        }
      })

      conversationFiltersStore.setStates({ listConvesationFilters: items })

      conversationFiltersStore.setUpdate({ successUpdating: true })

    } catch (ex) {

    } finally {
      conversationFiltersStore.setUpdate({ updating: false })
      conversationFiltersStore.setDialogs({ updateDialogOpen: false, currentItemInAction: null })
    }
  }, [conversationFiltersStore.listConvesationFilters])

  const DeleteConversationFilterAction = useCallback(async (data: DeleteConversationFilterRequestDTO) => {
    try {
      conversationFiltersStore.setDelete({ deleting: true, successDeleting: false })
      const req = await DeleteConversationFilter(data)

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      let items = [...conversationFiltersStore.listConvesationFilters]
      items = items.filter((el) => el.id != req.data.id)
      conversationFiltersStore.setStates({ listConvesationFilters: items })

      conversationFiltersStore.setDelete({ successDeleting: true })

    } catch (ex) {
      conversationFiltersStore.setDelete({ successDeleting: false })
    } finally {
      conversationFiltersStore.setDelete({ deleting: false })
      conversationFiltersStore.setDialogs({ deleteDialogOpen: false, currentItemInAction: null })
    }
  }, [conversationFiltersStore.listConvesationFilters])

  return {
    ListConversationFiltersAction,
    CreateConversationFilterAction,
    UdpateConversationFilterAction,
    DeleteConversationFilterAction,
  }

}