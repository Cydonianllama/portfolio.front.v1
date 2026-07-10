/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from 'next/navigation'

import { useEffect, PropsWithChildren } from "react";
import { ListWorkspacesUserService } from "../services/list-workspaces-user";
import { useWorkspaceSelectionStore } from "../stores/workspaceStore";
import { useAuthCydoStore } from "@/modules/auth/store/store";
import { UserDTO } from "@/api/user/user.dto";
import { UseWorkspacesAction } from '@/modules/hooks/useWorkspacesActions';
import { WorkspaceDTO } from '@/api/workspace/workspace.dto';

interface AppCydoProviderProps {
  userData?: UserDTO | null,
  workspaces: Array<WorkspaceDTO>
}

export const BootstrapProvider = ({ children, userData, workspaces }: PropsWithChildren<AppCydoProviderProps>) => {
  const searchParams = useSearchParams()
  const workspaceId = searchParams.get('workspaceId')

  const userStore = useAuthCydoStore()
  const workspaceStore = useWorkspaceSelectionStore();
  const workspaceActions = UseWorkspacesAction()

  const OnInitApplication = async () => {

    // fetch('http://localhost:3030/static/test.json')

    console.log(`query::workspaceId => ${workspaceId}`)
    console.log('OnInitApplication => ', userData)

    if (!userData) return;

    try {

      // guardar informacion de usuario
      if (userData) {
        userStore.setBasicUserInformation({
          email: userData.email,
          fullname: userData.name,
          id: userData.id,
        })
      }

      // listado de workspaces pretenecientes al usuario
      console.log('workspaces : ', workspaces)
        workspaceStore.setWorkspaces(workspaces)

      // validar query workspaceId
      let currentWorkspaceOpened: WorkspaceDTO | null = null;
      
      // validar si hay query
      if (workspaceId){
        const foundedWorkspace = workspaces.find(el => el.id == workspaceId)
        if (foundedWorkspace){
          currentWorkspaceOpened = foundedWorkspace;
        }
      }

      // si no encontró un workspace y existen registros de workspaces - abrir el primer workspace listado
      if (!currentWorkspaceOpened && workspaces.length > 0){
        currentWorkspaceOpened = workspaces[0]
      }

      // establecer el workspace
      if (currentWorkspaceOpened){
        workspaceActions.OpenWorkspace(currentWorkspaceOpened.id)
      }
      
    } catch (ex: any) {
      console.log(ex.message)
    }

  }

  useEffect(() => {
    OnInitApplication()
  }, [userData])

  return (<>
    {children}
  </>);
}