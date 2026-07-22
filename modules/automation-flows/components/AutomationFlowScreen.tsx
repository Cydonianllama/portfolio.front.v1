'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonPublish } from "./ButtonPublish";
import { ButtonsViewFlow } from "./ButtonsViewFlow";
import { ButtonsMemento } from "./ButtonsMemento";
import { EditorName } from "./EditorName";
import { ContentLoading } from "./states/Content.loading";
import FlowScreen from "../engineSimple/FlowShowcase";
import { edgeTypesConfiguration, nodeTypesConfigurations } from "../_configs";
import { EditorFlow } from "./EditorFlow";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationFlowScreenProps = {

}

export const AutomationFlowScreen = ({ }: AutomationFlowScreenProps) => {
  const useAppData = UseAppData()
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-20 w-full flex items-center justify-between gap-2 border-b border-t px-5">
          <div className="flex items-center gap-2">
            <EditorName />
          </div>
          <div className="flex gap-2 items-center">
            <ButtonsMemento />
            <ButtonsViewFlow />
            <ButtonPublish />
            {/* <ButtonEdit /> */}
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <EditorFlow />
          {/* <ContentLoading /> */}
          <FlowScreen
            edgeTypesConfiguration={edgeTypesConfiguration}
            nodeTypesConfigurations={nodeTypesConfigurations}
            initalEdges={[]}
            initialNodes={[]}
          />
        </div>
      </div>
    </>
  )
}