/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { UserDTO } from '@/api/user/user.dto'
import { WorkspaceDTO } from '@/api/workspace/workspace.dto'
import { GetUser } from '@/server/services/get.user'
import { GetUserSubscription } from '@/server/services/get.usersubscription'
import { GetUserWorkspaces } from '@/server/services/get.userworkspaces'

type BootstrapAppProps = {
  token: string,
}

type BootstrapAppRespomse = {
  user: UserDTO | null;
  workspaces: Array<WorkspaceDTO>
}

export const BootstrapApp = async ({ token } : BootstrapAppProps): Promise<BootstrapAppRespomse | null> => {
  try {
    // listamos la información del usuario
    const user = await GetUser(token)

    // listamos los workspaces
    const userWorkspaces = await GetUserWorkspaces(token, { userId: user?.data.user?.id || '' })

    // validamos la configuracion/subscripcion del workspace seleccionado

    return {
      user: user?.data.user || null,
      workspaces: userWorkspaces?.data.list || []
    }
  } catch (ex) {
    return null;
  }
}