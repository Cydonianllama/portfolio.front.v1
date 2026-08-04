import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { groupWordsItemSendMessageConfigNode, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordItemProps = {
  data: groupWordsItemSendMessageConfigNode
  index: number
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const GroupWordItem = ({ data, index, node }: GroupWordItemProps) => {
  const { UpdateMessageConfiguration } = useMessageEditorActions()

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [text, setText] = useState('')

  const HandleToRemoveGroup = () => {
    UpdateMessageConfiguration('removegroupword', node, {
      item: data,
      index: index
    })
  }

  const HandleToAddItem = () => {
    UpdateMessageConfiguration('addGroupWordItem', node, {
      item: {
        text: ''
      },
      index: index
    })
  }

  const HandleToRemoveItem = (itemIdx: number) => {
    UpdateMessageConfiguration('removegroupwordItem', node, {
      index: index,
      itemIndex: itemIdx
    })
  }

  const HandleToEditItem = (itemIdx: number) => {
    setEditingIndex(itemIdx)
    setText(data.words[itemIdx]?.text || '')
  }

  const HandleToCancelEdit = () => {
    setEditingIndex(null)
    setText('')
  }

  const HandleToSaveItem = (itemIdx: number) => {
    if (!text.trim()) return;
    UpdateMessageConfiguration('updategroupwordItem', node, {
      index: index,
      item: {
        text: text
      },
      itemIndex: itemIdx
    })
    setEditingIndex(null)
    setText('')
  }

  const connected = Boolean(data?.nextNode)
  const words = data?.words || []
  const wordCount = words.length

  return (
    <div className={`rounded-lg border overflow-hidden ${connected ? 'border-green-400 bg-green-50/40' : 'border-dashed border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b bg-mist-50/60">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`h-2 w-2 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-amber-400'}`}
            title={connected ? 'Conectado' : 'Sin conexión'}
          />
          <span className="text-xs font-medium text-foreground truncate">
            Grupo {index + 1}
          </span>
          {wordCount > 0 && (
            <span className="inline-flex items-center rounded-full border bg-white px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground tabular-nums">
              {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <Button onClick={HandleToAddItem} variant={'outline'} size={'icon-xs'} title="Agregar palabra">
            {IconsCatalog.addPlus.Icon}
          </Button>
          <Button onClick={HandleToRemoveGroup} variant={'outline'} size={'icon-xs'} title="Eliminar grupo">
            {IconsCatalog.removex.Icon}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 p-2">
        {words.length > 0 ? (
          words.map((el, idx) => (
            <div key={idx} className="contents">
              {editingIndex === idx ? (
                <div className="flex items-center gap-1">
                  <Input
                    value={text}
                    autoFocus
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') HandleToSaveItem(idx)
                      if (e.key === 'Escape') HandleToCancelEdit()
                    }}
                    className="h-6 w-28 px-1.5 text-xs"
                    placeholder="Palabra"
                  />
                  <button
                    onClick={() => HandleToSaveItem(idx)}
                    className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-green-100 hover:text-green-700"
                    title="Guardar"
                  >
                    {IconsCatalog.save.Icon}
                  </button>
                  <button
                    onClick={HandleToCancelEdit}
                    className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                    title="Cancelar"
                  >
                    {IconsCatalog.removex.Icon}
                  </button>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border bg-mist-50 px-2 py-0.5 text-xs text-foreground group">
                  <span className="truncate max-w-28">{el?.text || '...'}</span>
                  <button
                    onClick={() => HandleToEditItem(idx)}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground/60 hover:bg-blue-100 hover:text-blue-700"
                    title="Editar"
                  >
                    {IconsCatalog.edit.Icon}
                  </button>
                  <button
                    onClick={() => HandleToRemoveItem(idx)}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground/60 hover:bg-red-100 hover:text-red-600"
                    title="Eliminar"
                  >
                    {IconsCatalog.removex.Icon}
                  </button>
                </span>
              )}
            </div>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">Sin palabras aún</span>
        )}
      </div>
    </div>
  )
}
