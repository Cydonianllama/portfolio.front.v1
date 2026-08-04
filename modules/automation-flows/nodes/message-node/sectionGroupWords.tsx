import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { GroupWordsItem } from "./groupWordsItem";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type sectionGroupWordsProps = {
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const SectionGroupWords = ({ node }: sectionGroupWordsProps) => {
  return (
    <>
      <div className="space-y-2">
        {node.configuration?.groupWords?.length ? (
          node.configuration?.groupWords?.map((el) => (
            <GroupWordsItem key={el.id || el.nextNode} data={el} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
