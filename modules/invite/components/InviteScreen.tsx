'use client'

import { InviteCard } from "./InviteCard";
import { useEffect } from "react";
import { useInvitationAction } from "../actions/useInvitationActions";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type InviteScreenProps = {
  invitationId: string
}

export function InviteScreen({ invitationId }: InviteScreenProps) {
  const { getInvitationInfoAction } = useInvitationAction()
  const GetInvitationInformationAction = async () => {
    getInvitationInfoAction({
      invitationId,
      token: localStorage.getItem('token') || ''
    })
  }

  useEffect(() => {
    GetInvitationInformationAction()
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <InviteCard />
    </div>
  )
}