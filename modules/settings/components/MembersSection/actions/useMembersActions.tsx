import { toast } from "sonner"
import { useCallback } from "react"
import { useMembersStore } from "../store/membersStore";
import { CreateMember, CreateMemberRequestDTO, DeleteMember, DeleteMemberRequestDTO, GetMember, GetMembersRequestDTO, UpdateMember, UpdateMemberRequestDTO } from "@/api/members/members";

export type UseMembersActionsProps = {

}

export const useMembersActions = ({ }: UseMembersActionsProps) => {
  const MembersStore = useMembersStore();

  const createMembersAction = useCallback(async (data: CreateMemberRequestDTO) => {
    try {
      MembersStore.setCreateState({ creating: true })
      const reqCreation = await CreateMember(data);

      if (!reqCreation?.status) {
        console.log(reqCreation?.message)
        toast.error(reqCreation?.message || '[Error 1]')
        return;
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
        return;
      }

      if (reqCreation?.data.member && reqCreation.status) {
        const list = [reqCreation?.data.member, ...MembersStore.list]
        MembersStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      MembersStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [MembersStore.list])

  const updateMembersAction = useCallback(async (id: string, data: UpdateMemberRequestDTO) => {
    try {
      MembersStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateMember(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.member) {
        let list = [...MembersStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.member || el
          } else {
            return el;
          }
        })
        MembersStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      MembersStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [MembersStore.list])

  const listMembersAction = useCallback(async (data: GetMembersRequestDTO) => {
    try {
      MembersStore.setListState({ listing: true })

      if (data.page == 1) {
        MembersStore.setListState({ list: [] })
      }

      const reqList = await GetMember(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        MembersStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          MembersStore.setListState({ list: reqList.data.list })
        } else {
          MembersStore.setListState({ list: [...MembersStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      MembersStore.setListState({ listing: false })
    }
  }, [])

  const deleteMembersAction = useCallback(async (data: DeleteMemberRequestDTO) => {
    try {
      MembersStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteMember(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...MembersStore.list]
        list = list.filter(el => el.id != data.id)
        MembersStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      MembersStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [MembersStore.list])

  return {
    createMembersAction,
    updateMembersAction,
    listMembersAction,
    deleteMembersAction,
  }
}
