import { UseAppData } from "@/hooks/app/useAppData";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { GroupWordsItem } from "./groupWordsItem";
import { useAutomationNode } from "../../hooks/useAutomationNode";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type sectionGroupWordsProps = {
  id: string
}

export const SectionGroupWords = ({ id }: sectionGroupWordsProps) => {
  const useAppData = UseAppData()
  const { getNodeConfiguration } = useAutomationNode(String(id))
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  return (
    <>
      <div className="space-y-2">
        {nodeInformation?.configuration?.groupWords?.map((el, index) => (
          <GroupWordsItem key={index} data={el} index={index} />
        ))}
      </div>
    </>
  )
}