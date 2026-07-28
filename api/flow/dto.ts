
import { IAutomation, IAutomationNode, IPublishedAutomation, Trigger } from '@erick/conversationalflow';

export interface InformationAutomationFlow {
  publishedAutomation?: IPublishedAutomation
  automation?: IAutomation,
  nodeList?: Array<IAutomationNode>,
  triggers?: Array<Trigger>
}