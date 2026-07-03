'use client'

import { useEffect, PropsWithChildren } from "react";
import { ListWorkspacesUserService } from "../services/list-workspaces-user";
import { useWorkspaceSelectionStore } from "../stores/workspaceStore";
import { useAuthCydoStore } from "@/modules/auth/store/store";

interface AppCydoProviderProps {
  userData?: {
    id: string;
    name: string;
    email: string
  }
}

export const AppCydoProvider = ({ children, userData }:PropsWithChildren<AppCydoProviderProps>) => {

  const userStore = useAuthCydoStore()
  const workspaceStore = useWorkspaceSelectionStore();

  const OnInitApplication = async () => {

    try {

      // setear valores del auth
      if (userData){
        userStore.setBasicUserInformation({
          email: userData.email,
          fullname: userData.name,
          id: userData.id,
        })
      }

      // listado de workspaces pretenecientes al usuario
      const reqWorkspaces = await ListWorkspacesUserService({ userId: userData?.id || '' });
      if (reqWorkspaces && reqWorkspaces.status) {
        if (reqWorkspaces.data.list) {
          workspaceStore.setWorkspaces(reqWorkspaces.data.list)
        }
      }

    } catch (ex) {

    }

  }

  useEffect(() => {
    OnInitApplication()
  }, [])

  return (<>
    {children}
  </>);
}