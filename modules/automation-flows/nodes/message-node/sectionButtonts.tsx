import { UseAppData } from "@/hooks/app/useAppData";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { ButtonItem } from "./buttonItem";
import { useAutomationNode } from "../../hooks/useAutomationNode";
import { EmptyState } from "../../components/states/EmptyState";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SectionButtonsProps = {
  id: string
}

export const SectionButtons = ({ id }: SectionButtonsProps) => {
  const useAppData = UseAppData()
  const { getNodeConfiguration } = useAutomationNode(String(id))
  const nodeInformation = getNodeConfiguration() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;
  // <EmptyState title="Sin botones" />
  return (
    <>
      <div className="space-y-2">
        {nodeInformation?.configuration?.buttons?.length ? (
          nodeInformation?.configuration?.buttons?.map((el, index) => (
            <ButtonItem key={index} index={index} data={el} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}