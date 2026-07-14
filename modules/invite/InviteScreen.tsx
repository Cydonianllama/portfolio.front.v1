'use client'
import { UseAppData } from "@/hooks/app/useAppData";
import { InviteCard } from "./InviteCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type InviteScreenProps = {
  
}

export const InviteScreen = ({  }: InviteScreenProps) => {
  const useAppData = UseAppData()
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <InviteCard />
      </div>
    </>
  )
}