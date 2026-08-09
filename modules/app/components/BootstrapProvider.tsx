/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from 'next/navigation'

import { useEffect, PropsWithChildren } from "react";
import { ListWorkspacesUserService } from "../services/list-workspaces-user";
import { useWorkspaceSelectionStore } from "../stores/workspaceStore";
import { useAuthCydoStore } from "@/modules/auth/store/authStore";
import { UserDTO } from "@/api/user/user.dto";
import { UseWorkspacesAction } from '@/modules/hooks/useWorkspacesActions';
import { WorkspaceDTO } from '@/api/workspace/workspace.dto';
import { GeyWorkspaceSettings } from '@/api/settings/get.workspacesettings';
import { IUserSettings } from '@/api/user/user.settings';
import { Getentity } from '@/api/dataEngine/entity';
import { useAside } from '../stores/asideStore';

interface AppCydoProviderProps {
  userData?: UserDTO | null,
  workspaces: Array<WorkspaceDTO>
  userSettings: IUserSettings | null
}

export const BootstrapProvider = ({ children, userData, workspaces }: PropsWithChildren<AppCydoProviderProps>) => {
  const searchParams = useSearchParams()
  const workspaceId = searchParams.get('workspaceId')

  const userStore = useAuthCydoStore()
  const workspaceStore = useWorkspaceSelectionStore();
  const asideStore = useAside()
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
          fullname: userData.fullname,
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

        // listar las entidades a mostrar
        const entities = await Getentity({ page: 1, workspaceId: currentWorkspaceOpened.id })
        if (entities?.status && entities.data?.list){
          asideStore.setEntities(entities.data.list || [])
        }

        // listar configuracion del workpace
        const reqWorkspaceSettings = await GeyWorkspaceSettings({ workspaceId: currentWorkspaceOpened.id })
        if (reqWorkspaceSettings?.status && reqWorkspaceSettings.data?.setting){
          workspaceStore.setWorkspaceSetting(reqWorkspaceSettings.data.setting)
        }

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