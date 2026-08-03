import { IAutomationNode, NODE_TYPE_REQUEST_SERVICE, NodeRequestServiceConfig } from "@erick/conversationalflow";

export interface UpdateRequestServiceConfigurationActions {
  updateConfiguration: {
    configuration: NodeRequestServiceConfig
  }
}

type RequestServiceUpdateNodeType = IAutomationNode<typeof NODE_TYPE_REQUEST_SERVICE>

export class RequestServiceUpdater {

  private getNode(node: RequestServiceUpdateNodeType) {
    const nodeToUpdate = {
      ...node,
      configuration: {
        ...node.configuration,
        headers: node?.configuration?.headers ? [...node.configuration.headers] : [],
        mappers: node?.configuration?.mappers ? [...node.configuration.mappers] : [],
      },
    };
    return nodeToUpdate
  }

  //
  // configuration
  //
  updateConfiguration(node: RequestServiceUpdateNodeType, c: UpdateRequestServiceConfigurationActions["updateConfiguration"]) {
    const nodeToUpdate = this.getNode(node)
    nodeToUpdate.configuration = {
      url: c.configuration.url,
      method: c.configuration.method,
      headers: c.configuration.headers ? [...c.configuration.headers] : [],
      body: c.configuration.body,
      mappers: c.configuration.mappers ? [...c.configuration.mappers] : [],
    };
    return nodeToUpdate;
  }
}
