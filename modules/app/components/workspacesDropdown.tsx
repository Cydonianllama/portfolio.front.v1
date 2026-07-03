"use client"

import { ReactNode, useState } from "react"

import { AnthropicBlack } from "@/components/ui/svgs/anthropicBlack"
import { AnthropicWhite } from "@/components/ui/svgs/anthropicWhite"
import { ClaudeAiIcon } from "@/components/ui/svgs/claudeAiIcon"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDownIcon, CheckIcon, PlusIcon, SettingsIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useWorkspaceSelectionStore } from "../stores/workspaceStore"
import { DialogCreateWorkpace } from "./DialogCreateWorkspace"
import { CreateWorkspaceService } from "../services/create-workspace"
import { RequestCreateWorkspace } from "../schemas/create-workspace-schema"
import { UseWorkspacesAction } from "@/modules/hooks/useWorkspacesActions"

interface Workspace {
  id: string
  name: string
  plan: string
  avatar?: string
  logo?: ReactNode
  logoDark?: ReactNode
}

const workspaces: Workspace[] = [
  {
    id: "1",
    name: "Anthropic",
    plan: "Enterprise",
    logo: <AnthropicBlack />,
    logoDark: <AnthropicWhite />,
  },
  {
    id: "2",
    name: "Claude",
    plan: "Pro",
    logo: <ClaudeAiIcon />,
  },
  {
    id: "3",
    name: "Alex Wong",
    plan: "Team",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
  },
]

export function WorkspaceDropdown() {
  const workspaceActions = UseWorkspacesAction()
  const appWorkspacesStore = useWorkspaceSelectionStore();
  const activeWorkspace = appWorkspacesStore.workspaces.find((w) => w.id === appWorkspacesStore.selectedWorkspaceId) || workspaces[0]

  const CreateWorkspace = async (data: RequestCreateWorkspace) => {
    try {
      const reqWorkspace = await CreateWorkspaceService({
        name: data.name
      })

      if (!reqWorkspace) {
        return;
      }

      if (!reqWorkspace.status) {
        return;
      }

      if (!reqWorkspace.data?.workspace) {
        return;
      }

      const newWorkspace = reqWorkspace.data.workspace

      appWorkspacesStore.setWorkspaces([{ id: newWorkspace.id, logoURL: newWorkspace.logoURL, name: newWorkspace.name }, ...appWorkspacesStore.workspaces])

      workspaceActions.OpenWorkspace(newWorkspace.id)

    } catch (ex) {

    } finally {
      appWorkspacesStore.setworkspaceCreationState({
        open: false
      })
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