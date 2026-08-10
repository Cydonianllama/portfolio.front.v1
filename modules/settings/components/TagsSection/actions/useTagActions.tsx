import { toast } from "sonner"
import { CreateTagRequestDTO, DeleteTagRequestDTO, GetTagsRequestDTO, TagDTO, UpdateTagRequestDTO } from "@/api/tags/tags.dto";
import { CreateTag, UpdateTag, GetTags, DeleteTag } from "@/api/tags/tags.api";
import { useCallback } from "react";
import { useTagStore } from "../store/tagStore";

export type UseTagActionsProps = {}

export const useTagActions = ({ }: UseTagActionsProps) => {
  const TagStore = useTagStore();

  const createTagAction = useCallback(async (data: CreateTagRequestDTO) => {
    try {
      TagStore.setCreateState({ creating: true })
      const reqCreation = await CreateTag(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.tag && reqCreation.status) {
        const list = [reqCreation?.data.tag, ...TagStore.list]
        TagStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      TagStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [TagStore.list])

  const updateTagAction = useCallback(async (id: string, data: UpdateTagRequestDTO) => {
    try {
      TagStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateTag(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.tag) {
        let list = [...TagStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.tag || el
          } else {
            return el;
          }
        })
        TagStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      TagStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [TagStore.list])

  const listTagAction = useCallback(async (data: GetTagsRequestDTO) => {
    try {
      TagStore.setListState({ listing: true })

      if (data.page == 1) {
        TagStore.setListState({ list: [] })
      }

      const reqList = await GetTags(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        TagStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          TagStore.setListState({ list: reqList.data.list })
        } else {
          TagStore.setListState({ list: [...TagStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      TagStore.setListState({ listing: false })
    }
  }, [])

  const deleteTagAction = useCallback(async (data: DeleteTagRequestDTO) => {
    try {
      TagStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteTag(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...TagStore.list]
        list = list.filter(el => el.id != data.id)
        TagStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      TagStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [TagStore.list])

  return {
    createTagAction,
    updateTagAction,
    listTagAction,
    deleteTagAction,
  }
}
