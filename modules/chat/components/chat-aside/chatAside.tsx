import { UseAppData } from "@/hooks/app/useAppData";
import { useChatStore } from "../../store/store.chat";
import { MdOutlineMapsHomeWork, MdOutlineAlternateEmail, MdOutlinePhone } from "react-icons/md";
import { RiWhatsappLine } from "react-icons/ri";
import { RoomVariablesSection } from "./RoomVariablesSection";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ChatAsideProps = {

}

export const ChatAside = ({ }: ChatAsideProps) => {
  const useAppData = UseAppData()
  const chatStore = useChatStore()

  return (
    <>
      {/*  */}
      <div className="px-2 pt-2 flex justify-center flex-col items-center gap-1 border-b pb-3">
        <div className="h-14 w-14 rounded-full bg-gray-100 flex justify-center items-center font-semibold text-gray-500 text-2xl"> {chatStore.contactIndividualOpenedInformation?.fullname.charAt(0)}</div>
        <div className="font-semibold text-sm text-foreground">
          {chatStore.contactIndividualOpenedInformation?.fullname}
        </div>
        <div className="text-gray-400">
          <RiWhatsappLine />
        </div>
      </div>
      {/*  */}
      <div className="px-2 py-2 border-b">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <MdOutlineMapsHomeWork />
            <span className="text-muted-foreground">Dirección</span>
            <span className="ml-auto text-foreground text-xs truncate">{chatStore.contactIndividualOpenedInformation?.mainDirection || '-'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <MdOutlineAlternateEmail />
            <span className="text-muted-foreground">Email</span>
            <span className="ml-auto text-foreground text-xs truncate">{chatStore.contactIndividualOpenedInformation?.mainEmail || '-'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <MdOutlinePhone />
            <span className="text-muted-foreground">Número celular</span>
            <span className="ml-auto text-foreground text-xs truncate">{chatStore.contactIndividualOpenedInformation?.mainPhone || '-'}</span>
          </div>
        </div>
      </div>

      {/* Variables editables */}
      <div className="px-2 py-2">
        <RoomVariablesSection />
      </div>
    </>
  )
}