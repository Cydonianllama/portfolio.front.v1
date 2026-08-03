import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { groupWordsItemSendMessageConfigNode, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordItemProps = {
  data: groupWordsItemSendMessageConfigNode
  index: number
}

export const GroupWordItem = ({ data, index }: GroupWordItemProps) => {
  const useAppData = UseAppData()

  type modeWordItem = 'preview' | 'edit'
  const [modeItem, setModeItem] = useState<modeWordItem>('preview')

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const HandleToRemoveItem = (index: number, itemIdx: number) => {
    UpdateMessageConfiguration('removegroupwordItem', nodeInformation, {
      index: index,
      itemIndex: itemIdx
    })
  }

  const HandleToAddItem = (index: number) => {
    UpdateMessageConfiguration('addGroupWordItem', nodeInformation, {
      item: {
        text: ''
      },
      index: index
    })
  }

  const HandleToRemoveGroup = () => {
    UpdateMessageConfiguration('removegroupword', nodeInformation, {
      item: data,
      index: index
    })
  }

  const HandleToChangeModeEdit = (mode: modeWordItem, index: number) => {
    setModeItem(mode)

    setText(data.words[index].text)
  }

  // actions edit

  const SaveItemUpdated = (index: number, itemIdx: number) => {
    UpdateMessageConfiguration('updategroupwordItem', nodeInformation, {
      index: index,
      item: {
        text: text
      },
      itemIndex: itemIdx
    })
    setModeItem('preview')
  }

  //
  //
  //

  const [text, setText] = useState('')

  const connected = Boolean(data?.nextNode)

  return (
    <>
      <div className={`flex justify-between items-center rounded-lg border p-1 ${connected ? 'border-green-400 bg-green-50/50' : 'border-dashed border-gray-300'}`}>
        <span
          className={`h-2 w-2 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-amber-400'}`}
          title={connected ? 'Conectado' : 'Sin conexión'}
        />

        <div className="text-xs flex gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground p-0.5">
            {nodeInformation?.configuration?.groupWords[index]?.words?.map((el, idx) => (
              <div key={idx}>
                {modeItem == 'preview' && (<>
                  <div className="flex items-center">
                    {el?.text || '-'}
                  </div>
                  <button onClick={() => { HandleToChangeModeEdit('edit', idx) }}>
                    {IconsCatalog.edit.Icon}
                  </button>
                  <button onClick={() => { HandleToRemoveItem(index, idx) }}>
                    {IconsCatalog.removex.Icon}
                  </button>
                </>)}
                {modeItem == 'edit' && (<>
                  <Input value={text} onChange={(e) => setText(e.target.value)} />
                  <button onClick={() => { SaveItemUpdated(index, idx) }}>
                    {IconsCatalog.save.Icon}
                  </button>
                  <button onClick={() => { HandleToChangeModeEdit('preview', idx) }}>
                    {IconsCatalog.removex.Icon}
                  </button>
                </>)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <Button onClick={() => { HandleToAddItem(index) }} variant={'outline'} size={'icon-xs'}>
            {IconsCatalog.addPlus.Icon}
          </Button>
          <Button onClick={HandleToRemoveGroup} variant={'outline'} size={'icon-xs'}>
            {IconsCatalog.removex.Icon}
          </Button>
        </div>
      </div>
    </>
  )
}