import type { variableType } from "./variable.type.js";
export interface Variables {
  id: string;
  code: string;
  creationDate: Date;
  name: string;
  type: variableType;
}