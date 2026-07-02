export enum UserStatus {
  actived = 1,
  desactived = 2,
  blocked = 3
}

export enum UserInternalRol {
  admin = "admin",
  support = "support"
}

export const UserStatusConfiguration: Record<UserStatus, { text: string }> = {
  [UserStatus.actived]: {
    text: "Activado"
  },
  [UserStatus.desactived]: {
    text: "Desactivado"
  },
  [UserStatus.blocked]: {
    text: "Bloqueado"
  }
}

export const UserInternalRolConfiguration: Record<UserInternalRol, { text: string }> = {
  [UserInternalRol.admin]: {
    text: "Admin"
  },
  [UserInternalRol.support]: {
    text: "Support"
  }
}
