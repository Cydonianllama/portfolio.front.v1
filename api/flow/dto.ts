import { IAutomation } from "@/flow-engines/simpleAutomation/models/automation"
import { IAutomationNode } from "@/flow-engines/simpleAutomation/models/node.automation"
import { IPublishedAutomation } from "@/flow-engines/simpleAutomation/models/published.automation"
import { Trigger } from "@/flow-engines/simpleAutomation/models/trigger"

export interface InformationAutomationFlow {
  publishedAutomation?: IPublishedAutomation
  automation?: IAutomation,
  nodeList?: Array<IAutomationNode>,
  triggers?: Array<Trigger>
}