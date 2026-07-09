import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IoMdClose } from "react-icons/io"
import { useSettingsStore } from "../store/settingsStore"

type TabHeaderDialogSettingsProps = {
  title: string
}

export const TabHeaderDialogSettings = ({ title }: TabHeaderDialogSettingsProps) => {
  const settingsStore = useSettingsStore()

  return <>
    <div className="mb-5" >
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
      <Button onClick={() => {
        settingsStore.setOpen(false)
      }} variant={'ghost'} size={'icon'}>
        <IoMdClose />
      </Button>
      </div>
      <Separator />
    </div>
    
  </>
}