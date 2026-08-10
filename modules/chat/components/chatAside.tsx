import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useChatActions } from "../actions/useChatActions"
import { useConversationFiltersActions } from "../actions/useConversationFilters"
import { useCoversationFiltersStore } from "../store/store.conversationFilters"
import { ButtonSearchChat } from "./ButtonSearchChat"
import { ListConversationPagesSection, ALL_CHATS_FILTER_ID } from "./chatAside/ListConversationPages"
import { DialogConfirmDeleteConversationFilter } from "./DialogConfirmConversationFilterDeletion"
import { DialogCreateConversationFilter } from "./DialogCreateConversationFilter"
import { DialogEditConversationFilter } from "./DialogEditConversationFilter"
import { DialogManageConversationFilters } from "./DialogManageConversationFilters"

export function ChatAside() {
  const workspaceSelectionStore = useWorkspaceSelectionStore()
  const conversationFilterActions = useConversationFiltersActions()
  const conversationFilterStore = useCoversationFiltersStore()
  const chatActions = useChatActions()

  return (<>
    <div className={`w-[var(--chat-aside-width)] max-w-w-[var(--chat-aside-width)] min-w-w-[var(--chat-aside-width)] border-r h-full flex flex-col`}>

      {/*  */}
      <div className="flex justify-between px-2 h-[var(--chat-header-height)] items-center">
        <h1 className="font-semibold text-foreground">Inbox</h1>
        <div>
          <ButtonSearchChat />
        </div>
      </div>
      {/*  */}

      {/*  */}
      <ListConversationPagesSection
        listConvesationFilters={conversationFilterStore.listConvesationFilters}
        handleOpenManageConversationFilter={() => {
          conversationFilterStore.setDialogs({ manageDialogOpen: true })
        }}
        onClickOpenConversationFilter={(id) => {
          if (id === ALL_CHATS_FILTER_ID) {
            // "todos los chats": listar sin filtro
            chatActions.ListChatsAction({
              page: 1,
              workspaceId: workspaceSelectionStore.selectedWorkspaceId || '',
            })
            return;
          }
          chatActions.ListChatsAction({
            page: 1,
            workspaceId: workspaceSelectionStore.selectedWorkspaceId || '',
            filter: id
          })
        }}
      />
      {/*  */}

    </div>


    <DialogManageConversationFilters
      open={conversationFilterStore.manageDialogOpen}
      setOpen={(open) => { conversationFilterStore.setDialogs({ manageDialogOpen: open }) }}
      conversationsFilter={conversationFilterStore.listConvesationFilters}
      onClickCreate={() => {
        conversationFilterStore.setDialogs({ creationDialogOpen: true })
      }}
      onClickEdit={(item) => {
        conversationFilterStore.setDialogs({ updateDialogOpen: true, currentItemInAction: item })
      }}
      onClickDelete={(item) => {
        conversationFilterStore.setDialogs({ deleteDialogOpen: true, currentItemInAction: item })
      }}
    />

    <DialogCreateConversationFilter
      open={conversationFilterStore.creationDialogOpen}
      setOpen={(open) => conversationFilterStore.setDialogs({ creationDialogOpen: open })}
      creating={false}
      onCreate={(data) => {
        conversationFilterActions.CreateConversationFilterAction({
          name: data.name || '',
          workspaceId: workspaceSelectionStore.selectedWorkspaceId || '',
          icon: data.icon,
        })
      }}
    />

    <DialogEditConversationFilter
      open={conversationFilterStore.updateDialogOpen}
      setOpen={(open) => conversationFilterStore.setDialogs({ updateDialogOpen: open })}
      onUpdate={(data) => {
        conversationFilterActions.UdpateConversationFilterAction({ id: conversationFilterStore.currentItemInAction?.id || '', name: data.name || '', icon: data.icon })
      }}
      updating={conversationFilterStore.updating}
      data={conversationFilterStore.currentItemInAction || null}
    />

    <DialogConfirmDeleteConversationFilter
      open={conversationFilterStore.deleteDialogOpen}
      deleting={conversationFilterStore.deleting}
      onDelete={() => {
        conversationFilterActions.DeleteConversationFilterAction({ id: conversationFilterStore.currentItemInAction?.id || '' })
      }}
      setOpen={(open) => conversationFilterStore.setDialogs({ deleteDialogOpen: open })}
    />

  </>)
}