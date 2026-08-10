"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDownIcon, CheckIcon, PlusIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useWorkspaceSelectionStore } from "../stores/workspaceStore"
import { DialogCreateWorkpace } from "./DialogCreateWorkspace"
import { RequestCreateWorkspace } from "../schemas/create-workspace-schema"
import { UseWorkspacesAction } from "@/modules/app/actions/useWorkspacesActions"
import { useAppActions } from "../actions/useAppActions"
import { useState } from "react"
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { ReorderWorkspaces } from "@/api/workspace/workspace.api"
import { useAuthCydoStore } from "@/modules/auth/store/authStore"

function SortableWorkspaceItem({ workspace, isSelected, onClick }: { 
  workspace: { id: string; name: string; logoURL: string }, 
  isSelected: boolean, 
  onClick: () => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: workspace.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DropdownMenuItem
      ref={setNodeRef}
      style={style}
      className="gap-3 cursor-default"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <div {...attributes} {...listeners} className="cursor-grab shrink-0">
        <GripVertical className="size-3 text-muted-foreground" />
      </div>

      {workspace.logoURL ? (
        <>
          <span aria-hidden className="dark:hidden">
            {workspace.logoURL}
          </span>
          <span aria-hidden className="hidden dark:block">
            {workspace.logoURL}
          </span>
        </>
      ) : (
        workspace.logoURL && workspace.logoURL
      )}

      {(workspace.logoURL || workspace.name) && (
        <Avatar className="size-4">
          <AvatarImage src={workspace.logoURL} alt={workspace.name} />
          <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-1 flex-col">
        <span className="text-sm font-medium">{workspace.name}</span>
      </div>

      {isSelected && (
        <CheckIcon className="text-primary size-4" aria-hidden="true" />
      )}
    </DropdownMenuItem>
  )
}

export function WorkspaceDropdown() {
  const { createWorkspaceFromDropdownAction } = useAppActions()
  const workspaceActions = UseWorkspacesAction()
  const appWorkspacesStore = useWorkspaceSelectionStore();
  const authStore = useAuthCydoStore();
  const activeWorkspace = appWorkspacesStore.workspaces.find((w) => w.id === appWorkspacesStore.selectedWorkspaceId) || { id: '-', logoURL: '', name: '-' }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const CreateWorkspace = async (data: RequestCreateWorkspace) => {
    createWorkspaceFromDropdownAction({ name: data.name })
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = appWorkspacesStore.workspaces.findIndex((w) => w.id === active.id);
    const newIndex = appWorkspacesStore.workspaces.findIndex((w) => w.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newList = arrayMove([...appWorkspacesStore.workspaces], oldIndex, newIndex);
    const orderedIds = newList.map(w => w.id);

    appWorkspacesStore.reorderWorkspaces(orderedIds);

    if (authStore.basicUserInformation?.id) {
      await ReorderWorkspaces(authStore.basicUserInformation.id, orderedIds);
    }
  }

  return (<>
    <SidebarMenu>
      <SidebarMenuItem>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton variant={'outline'}>
              <div className="gap-1.5 flex items-center">
                {(activeWorkspace.name) && (
                  <Avatar className="size-4">
                    <AvatarImage src={activeWorkspace.name} alt={activeWorkspace.name} />
                    <AvatarFallback>{activeWorkspace.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <span className="text-sm font-medium">{activeWorkspace.name}</span>
              <ChevronsUpDownIcon className="ml-auto size-3.5 opacity-60" aria-hidden="true" />
            </SidebarMenuButton>}
          >

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={appWorkspacesStore.workspaces.map(w => w.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {appWorkspacesStore.workspaces.map((workspace) => (
                    <SortableWorkspaceItem
                      key={workspace.id}
                      workspace={workspace}
                      isSelected={appWorkspacesStore.selectedWorkspaceId === workspace.id}
                      onClick={() => workspaceActions.OpenWorkspace(workspace.id)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => { appWorkspacesStore.setworkspaceCreationState({ open: true }) }}>
                <PlusIcon aria-hidden="true" />
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </SidebarMenuItem>
    </SidebarMenu>

    <DialogCreateWorkpace
      onCreate={CreateWorkspace}
      open={appWorkspacesStore.workspaceCreationState.open}
      setOpen={(open) => { appWorkspacesStore.setworkspaceCreationState({ open }) }}
      creating={appWorkspacesStore.workspaceCreationState.loading}
    />
  </>)
}
