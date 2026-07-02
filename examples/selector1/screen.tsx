"use client"

import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// setup
import { api } from "@/setup/axios"

export interface SelectorItem {
  id: string
  name: string
  urlProfile: string | null
  detail: string
}

export interface SelectorResponse {
  users: SelectorItem[]
  workspaces: SelectorItem[]
}

export const searchWorkspaceSelector = async (
  query: string
): Promise<SelectorResponse> => {
  // const response = await api.get("/api/workspace-selector", {
  //   params: {
  //     query,
  //   },
  // })

  const response = {
    data: {
      data: {
        users: [
          {
            id: "usr_1",
            name: "Alex Johnson",
            urlProfile:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
            detail: "alex@example.com",
          },
          {
            id: "usr_2",
            name: "Sarah Chen",
            urlProfile:
              "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
            detail: "sarah@example.com",
          },
        ],
        workspaces: [
          {
            id: "wsp_1",
            name: "Marketing Perú",
            urlProfile: null,
            detail: "12 miembros",
          },
          {
            id: "wsp_2",
            name: "Atención al Cliente",
            urlProfile: null,
            detail: "8 miembros",
          },
          {
            id: "wsp_3",
            name: "Automatizaciones IA",
            urlProfile: null,
            detail: "21 miembros",
          },
        ],
      },
    },
  }

  return response.data.data
}

export const SelectorScreen = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<SelectorResponse>({
    users: [],
    workspaces: [],
  })

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true)

        const response = await searchWorkspaceSelector(query)

        setData(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <>
      <div className="p-50 flex justify-center">
        <Button onClick={() => setOpen(true)} variant="outline">
          Asociar workspace
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="**:data-[selected=true]:bg-muted **:data-selected:bg-transparent">
            <CommandInput
              placeholder="Buscar workspace o usuario..."
              value={query}
              onValueChange={setQuery}
            />

            <CommandList>
              {!loading &&
                data.users.length === 0 &&
                data.workspaces.length === 0 && (
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                )}

              <CommandGroup heading="Seleccionar workspace">
                {data.workspaces.map((workspace) => (
                  <CommandItem
                    key={workspace.id}
                    value={workspace.name}
                    className="gap-2 py-2"
                    onSelect={() => {
                      console.log("workspace", workspace)
                      setOpen(false)
                    }}
                  >
                    <Avatar className="size-6 shrink-0">
                      <AvatarImage
                        src={workspace.urlProfile ?? undefined}
                        alt={workspace.name}
                      />
                      <AvatarFallback className="text-xs">
                        {workspace.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium">
                        {workspace.name}
                      </span>

                      <span className="text-muted-foreground text-xs">
                        {workspace.detail}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Buscar workspaces por usuario">
                {data.users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    className="gap-2 py-2"
                    onSelect={() => {
                      console.log("user", user)
                    }}
                  >
                    <Avatar className="size-6 shrink-0">
                      <AvatarImage
                        src={user.urlProfile ?? undefined}
                        alt={user.name}
                      />

                      <AvatarFallback className="text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium">
                        {user.name}
                      </span>

                      <span className="text-muted-foreground text-xs">
                        {user.detail}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </>
  )
}