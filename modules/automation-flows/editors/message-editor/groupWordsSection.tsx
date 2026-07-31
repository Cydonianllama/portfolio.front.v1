import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { GroupWordItem } from "./groupWordItem";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordsSectionProps = {

}

export const GroupWordsSection = ({ }: GroupWordsSectionProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const HandleAddGroupWord = () => {
    UpdateMessageConfiguration(
      'addgroupword',
      nodeInformation,
      {
        item: {
          id: `words-${Math.ceil(Math.random() * 1000000)}-${Math.ceil(Math.random() * 1000000)}`,
          nextNode: null,
          words: []
        }
      }
    )
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Palabras</div>
          <div>
            <Button onClick={HandleAddGroupWord} variant={'outline'} size={'icon-sm'}>
              {IconsCatalog.addPlus.Icon}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {nodeInformation.configuration?.groupWords?.map((el, index) => <GroupWordItem index={index} data={el} key={index} />)}
        </div>
      </div>
    </>
  )
}