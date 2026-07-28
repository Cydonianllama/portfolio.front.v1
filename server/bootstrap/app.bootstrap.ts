/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { UserDTO } from '@/api/user/user.dto'
import { WorkspaceDTO } from '@/api/workspace/workspace.dto'
import { GetUser } from '@/server/services/get.user'
import { GetUserSubscription } from '@/server/services/get.usersubscription'
import { GetUserWorkspaces } from '@/server/services/get.userworkspaces'
import { IUserSettings } from '@/api/user/user.settings'
import { GetUserSettings } from '../services/get.usersettings'

type BootstrapAppProps = {
  token: string,
}

type BootstrapAppRespomse = {
  user: UserDTO | null;
  workspaces: Array<WorkspaceDTO>
  userSettings: IUserSettings | null
}

export const BootstrapApp = async ({ token } : BootstrapAppProps): Promise<BootstrapAppRespomse | null> => {
  try {
    // listamos la información del usuario
    const user = await GetUser(token)

    // listamos los workspaces
    const userWorkspaces = await GetUserWorkspaces(token, { userId: user?.data.user?.id || '' })

    //TODO: validamos la configuracion/subscripcion del workspace seleccionado

    // listamos configuraciones de usuario y workspace
    const userSettings = await GetUserSettings(token, { userId: user?.data.user?.id || '' })

    return {
      user: user?.data.user || null,
      workspaces: userWorkspaces?.data.list || [],
      userSettings: userSettings?.data.setting || null
    }
  } catch (ex) {
    return null;
  }
}