import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { GroupWordItem } from "./groupWordItem";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { EmptyState } from "../../components/states/EmptyState";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordsSectionProps = {
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const GroupWordsSection = ({ node }: GroupWordsSectionProps) => {
  const { UpdateMessageConfiguration } = useMessageEditorActions()

  const HandleAddGroupWord = () => {
    UpdateMessageConfiguration(
      'addgroupword',
      node,
      {
        item: {
          id: `words-${Math.ceil(Math.random() * 1000000)}-${Math.ceil(Math.random() * 1000000)}`,
          nextNode: null,
          words: []
        }
      }
    )
  }

  const groupWords = node.configuration?.groupWords || []

  const allWords = groupWords.flatMap((group) => group.words?.map((word) => word.text) || [])

  const duplicatedWords = allWords
    .filter((text, index, arr) => text && arr.indexOf(text) !== index)

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Palabras</div>
          <div>
            <Button onClick={HandleAddGroupWord} variant={'outline'} size={'icon-sm'} title="Agregar grupo de palabras">
              {IconsCatalog.addPlus.Icon}
            </Button>
          </div>
        </div>
        {duplicatedWords.length > 0 && (
          <p className="text-xs text-amber-600">
            Palabras repetidas entre grupos: {[...new Set(duplicatedWords)].join(', ')}
          </p>
        )}
        <div className="flex flex-col gap-2">
          {groupWords.length ? (
            groupWords.map((el, index) => <GroupWordItem data={el} index={index} node={node} key={el.id} />)
          ) : (
            <EmptyState
              Icon={IconsCatalog.addPlus.Icon}
              title="Sin palabras clave"
              description="Agrupa palabras clave para detectar la intención del usuario."
            />
          )}
        </div>
      </div>
    </>
  )
}
