/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { buttonItemSendMessageConfigNode, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonItemProps = {
  data: buttonItemSendMessageConfigNode
  index: number
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const ButtonItem = ({ data, index, node }: ButtonItemProps) => {
  const { UpdateMessageConfiguration } = useMessageEditorActions()

  const HandleRemoveButton = () => {
    UpdateMessageConfiguration('removeButton', node, {
      index: index
    })
  }

  const HandleToUpdate = (text: string) => {
    if (id) clearTimeout(id)
    settext(text)
    const newId = setTimeout(() => {
      UpdateMessageConfiguration('updateButton', node, {
        index: index,
        data: {
          ...data,
          text: text
        }
      })
    }, 1000)
    setid(newId)
  }

  // status
  const [text, settext] = useState(data.text)
  const [id, setid] = useState<any>(null)

  const connected = Boolean(data?.nextNode)

  return (
    <>
      <div className={`flex justify-between items-center gap-1.5 rounded-lg border p-1 ${connected ? 'border-green-400 bg-green-50/50' : 'border-dashed border-gray-300'}`}>
        <span
          className={`h-2 w-2 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-amber-400'}`}
          title={connected ? 'Conectado' : 'Sin conexión'}
        />
        <div className=" flex-1 text-center text-foreground">
          <Input value={text} onChange={(e) => HandleToUpdate(e.target.value)} />
        </div>
        <div className="flex gap-1 items-center">
          <Button onClick={HandleRemoveButton} variant={'outline'} size={'icon-xs'}>
            {IconsCatalog.removex.Icon}
          </Button>
        </div>
      </div>
    </>
  )
}
