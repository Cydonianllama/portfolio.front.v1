import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IoMdClose } from "react-icons/io"
import { useSettingsStore } from "../store/settingsStore"

type TabHeaderDialogSettingsProps = {
  title: string
  description?: string
  showClose?: boolean
}

export const TabHeaderDialogSettings = ({ title, description, showClose }: TabHeaderDialogSettingsProps) => {
  const settingsStore = useSettingsStore()

  return <>
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground" >{description}</p>
      </div>
      {showClose && (
        <Button onClick={() => {
          settingsStore.setOpen(false)
        }} variant={'ghost'} size={'icon'}>
          <IoMdClose />
        </Button>
      )}
    </div>
    <Separator />
  </>
}