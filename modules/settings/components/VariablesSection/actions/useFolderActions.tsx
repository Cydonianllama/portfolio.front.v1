import { toast } from "sonner"
import { CreateFolder, CreateFolderRequestDTO, DeleteFolder, DeleteFolderRequestDTO, FolderDTO, GetFolder, GetFoldersRequestDTO, UpdateFolder, UpdateFolderRequestDTO } from "@/api/folder/folder.api"
import { useCallback } from "react"
import { useFolderStore } from "../store/folder.store"

export type UseFolderActionsProps = {}

export const useFolderActions = ({ }: UseFolderActionsProps) => {
  const FolderStore = useFolderStore();

  const createFolderAction = useCallback(async (data: CreateFolderRequestDTO) => {
    try {
      FolderStore.setCreateState({ creating: true })
      const reqCreation = await CreateFolder(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.folder && reqCreation.status) {
        const list = [reqCreation?.data.folder, ...FolderStore.list]
        FolderStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      FolderStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [FolderStore.list])

  const updateFolderAction = useCallback(async (id: string, data: UpdateFolderRequestDTO) => {
    try {
      FolderStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateFolder(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.folder) {
        let list = [...FolderStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.folder || el
          } else {
            return el;
          }
        })
        FolderStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      FolderStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [FolderStore.list])

  const listFolderAction = useCallback(async (data: GetFoldersRequestDTO) => {
    try {
      FolderStore.setListState({ listing: true })

      if (data.page == 1) {
        FolderStore.setListState({ list: [] })
      }

      const reqList = await GetFolder(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        FolderStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          FolderStore.setListState({ list: reqList.data.list })
        } else {
          FolderStore.setListState({ list: [...FolderStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      FolderStore.setListState({ listing: false })
    }
  }, [])

  const deleteFolderAction = useCallback(async (data: DeleteFolderRequestDTO) => {
    try {
      FolderStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteFolder(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...FolderStore.list]
        list = list.filter(el => el.id != data.id)
        FolderStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      FolderStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [FolderStore.list])

  return {
    createFolderAction,
    updateFolderAction,
    listFolderAction,
    deleteFolderAction,
  }
}
