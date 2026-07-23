import { variableType } from "../../variable.type.js";
import { operators } from "../_condition_configuration/operators.js";
import { strategiesPersonalizedVars } from "./strategies.personalized.js";
import { systemVariables } from "./system.variables.js";

type personalizedConfig = {
  code: string,
  type: variableType,
  operators: Array<string>,
  isAsync: boolean,
  asyncStrategyCode: strategiesPersonalizedVars,
  staticValues?: Array<{ label: string, value: string }>
}

export const personalizedVariableConfig: Array<personalizedConfig> = [
  {
    code: systemVariables.SYSTEM_VAR_TAGS,
    type: variableType.ARRAY,
    operators: [
      operators.OPERATOR_CONTAINS,
      operators.OPERATOR_DOESNOTCONTAIN,
    ],
    isAsync: true,
    asyncStrategyCode: strategiesPersonalizedVars.tags
  }
]