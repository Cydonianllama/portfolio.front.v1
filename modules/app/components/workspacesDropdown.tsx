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

export function WorkspaceDropdown() {
  const { createWorkspaceFromDropdownAction } = useAppActions()
  const workspaceActions = UseWorkspacesAction()
  const appWorkspacesStore = useWorkspaceSelectionStore();
  const activeWorkspace = appWorkspacesStore.workspaces.find((w) => w.id === appWorkspacesStore.selectedWorkspaceId) || { id: '-', logoURL: '', name: '-' }

  const CreateWorkspace = async (data: RequestCreateWorkspace) => {
    createWorkspaceFromDropdownAction({ name: data.name })
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
              {appWorkspacesStore.workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  className="gap-3"
                  onClick={() => workspaceActions.OpenWorkspace(workspace.id)}
                >
                  {/* Workspace logo (dark mode) */}
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

                  {/* Workspace name and plan */}
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{workspace.name}</span>
                    {/* <span className="text-muted-foreground text-xs">
                      {workspace.name}
                    </span> */}
                  </div>

                  {/* Check icon */}
                  {appWorkspacesStore.selectedWorkspaceId === workspace.id && (
                    <CheckIcon className="text-primary size-4" aria-hidden="true" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => { appWorkspacesStore.setworkspaceCreationState({ open: true }) }}>
                <PlusIcon aria-hidden="true" />
                Create Workspace
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <SettingsIcon aria-hidden="true" />
                Manage Workspaces
              </DropdownMenuItem> */}
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