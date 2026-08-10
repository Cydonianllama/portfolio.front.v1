'use client'

import { useAppData } from "@/hooks/app/useAppData"
import { Button } from "@/components/ui/button"

import { useEffect } from "react"
import { useMembersActions } from "./actions/useMembersActions"
import { DialogConfirmDelete } from "./components/dialogConfirmDelete"
import { DialogCreateMembers } from "./components/dialogCreateMember"
import { DialogUpdateMembers } from "./components/dialogUpdateMember"
import { MembersTable_, MembersFooterTable } from "./components/table"
import { useMembersStore } from "./store/membersStore"

type MembersProps = {}

export const MembersSection_ = ({ }: MembersProps) => {
  const appData = useAppData()
  const MembersStore = useMembersStore();
  const membersActions = useMembersActions({})

  const InitialList = () => {
    membersActions.listMembersAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    <div className="">
      <div className="flex justify-between gap-2 items-center mb-2">
        <div className="text-foreground font-semibold text-md">
          Listado de Miembros
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={MembersStore.listing ? true : false} variant={'outline'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { MembersStore.setCreateState({ openCreate: true }) }}>
            Agregar miembro
          </Button>
        </div>
      </div>

      <MembersTable_
        isError={false}
        isLoading={MembersStore.listing}
        list={MembersStore.list}
        handleDelete={(id, item) => {
          MembersStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          MembersStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <MembersFooterTable
        HandleToNextPage={() => {
          if (!MembersStore.pagination) return;
          MembersStore.setListState({
            pagination: {
              ...MembersStore.pagination,
              page: MembersStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!MembersStore.pagination) return;
          MembersStore.setListState({
            pagination: {
              ...MembersStore.pagination,
              page: MembersStore.pagination?.page - 1,
            }
          })
        }}
        pagination={MembersStore.pagination}
      />
    </div>

    <DialogCreateMembers />
    <DialogUpdateMembers />
    <DialogConfirmDelete />
  </>
}