//
// configuraciones
//

import { variableType } from "../../variable.type.js"
import { operators } from "../_condition_configuration/operators.js"

type DefaultVariableConfigurationType = { operators: Array<string> }

export const DefaultVariableConfiguration: Record<variableType, DefaultVariableConfigurationType> = {
  [variableType.ARRAY]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
      operators.OPERATOR_CONTAINS,
      operators.OPERATOR_DOESNOTCONTAIN,
      operators.OPERATOR_LENGTH_EQUALTO,
      operators.OPERATOR_LENGTH_GREATERTHAN,
      operators.OPERATOR_LENGTH_LESSTHAN,
      operators.OPERATOR_LENGTH_GREATERTHAROREQUALTO,
      operators.OPERATOR_LENGTH_LESSTHANOREQUALTO,
    ]
  },
  [variableType.STRING]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
      operators.OPERATOR_ISEQUALTO,
      operators.OPERATOR_ISNOTEQUALTO,
      operators.OPERATOR_CONTAINS,
      operators.OPERATOR_DOESNOTCONTAIN,
      operators.OPERATOR_STARTWITH,
      operators.OPERATOR_DOESNOTSTARTWITH,
      operators.OPERATOR_ENDSWITH,
      operators.OPERATOR_DOESNOTENDWITH,
      operators.OPERATOR_MATCHESREGEX,
      operators.OPERATOR_DOESNOTMATCHREGEX,
    ]
  },
  [variableType.NUMBER]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
      operators.OPERATOR_ISEQUALTO,
      operators.OPERATOR_ISNOTEQUALTO,
      operators.OPERATOR_GREATERTHAN,
      operators.OPERATOR_LESSTHAN,
      operators.OPERATOR_GREATERTHABOREQUALTO,
      operators.OPERATOR_LESSTHANOREQUALTO,
    ]
  },
  [variableType.BOOLEAN]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
      operators.OPERATOR_ISTRUE,
      operators.OPERATOR_ISFALSE,
      operators.OPERATOR_ISEQUALTO,
      operators.OPERATOR_ISNOTEQUALTO,
    ]
  },
  [variableType.OBJECT]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
    ]
  },
  [variableType.DATE]: {
    operators: [
      operators.OPERATOR_EXIST,
      operators.OPERATOR_DOESNOTEXIST,
      operators.OPERATOR_ISEMPTY,
      operators.OPERATOR_ISNOTEMPTY,
      operators.OPERATOR_ISEQUALTO,
      operators.OPERATOR_ISNOTEQUALTO,
      operators.OPERATOR_ISAFTER,
      operators.OPERATOR_ISBEFORE,
      operators.OPERATOR_ISAFTEROREQUALTO,
      operators.OPERATOR_ISBEFOREOREQUALTO
    ]
  },
  [variableType.PERSONALIZED]: {
    operators: []  
  }
}