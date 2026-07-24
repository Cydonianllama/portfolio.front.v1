import { FIRST_STEP_NODE } from "../_configs";
import { nodesFlow } from "../engineSimple/types";

export const canOpenEditor = (node: nodesFlow) => {
  if (node.type == FIRST_STEP_NODE){
    return false
  }

  return true;
}