import { useAppData } from "@/hooks/app/useAppData"

import { TiFolderOpen } from "react-icons/ti"
import { DialogConfirmDelete } from "../MembersSection/components/dialogConfirmDelete"
import { useFolderActions } from "./actions/useFolderActions"
import { DialogCreateFolder } from "./components/folder/dialogCreaeFolder"
import { DialogUpdateFolder } from "./components/folder/dialogUpdateFolder"
import { FolderList_ } from "./components/folder/tableFolders"
import { useFolderStore } from "./store/folder.store"
import { useEffect } from "react"

//___________ ___________ Main

type FolderProps = {

}

export const FolderSection = ({ }: FolderProps) => {
  const appData = useAppData()
  const FolderStore = useFolderStore();
  const folderActions = useFolderActions({})

  const InitialList = () => {
    folderActions.listFolderAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (appData.workspace) OnInit()
  }, [appData.workspace])

  return <>
    <div className="">

      <div className="flex justify-between gap-2 items-center mb-2">
        <h1 className="text-lg font-semibold flex gap-1 items-center">
          <span><TiFolderOpen /></span>
          <span>Folders</span>
        </h1>
        <div>
          {/* <Button disabled={FolderStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { FolderStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button> */}
        </div>
      </div>

      <FolderList_
        isError={false}
        isLoading={FolderStore.listing}
        list={FolderStore.list}
        HandleDragEndEvent={() => { }}
        onClickDelete={(id, item) => {
          FolderStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          FolderStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />


      {/* <FolderFooterTable
        HandleToNextPage={() => {
          if (!FolderStore.pagination) return;
          FolderStore.setListState({
            pagination: {
              ...FolderStore.pagination,
              page: FolderStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!FolderStore.pagination) return;
          FolderStore.setListState({
            pagination: {
              ...FolderStore.pagination,
              page: FolderStore.pagination?.page - 1,
            }
          })
        }}
        pagination={FolderStore.pagination}
      /> */}
    </div>

    <DialogCreateFolder />
    <DialogUpdateFolder />
    <DialogConfirmDelete />
  </>
}