import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { ButtonItem } from "./buttonItem";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SectionButtonsProps = {
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const SectionButtons = ({ node }: SectionButtonsProps) => {
  return (
    <>
      <div className="space-y-2">
        {node.configuration?.buttons?.length ? (
          node.configuration?.buttons?.map((el) => (
            <ButtonItem key={el.id || el.nextNode} data={el} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
