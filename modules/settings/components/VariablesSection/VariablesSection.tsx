/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { VariableSection } from './variables_scratch';
export interface Table1ExampleModel {
  id: string;
  name: string;
  statusName: string;
  creationDate: Date;
}


type SimpleTablev1Props = {
  list: Array<any>
  loading: boolean;
  hasError?: boolean;
}

export const VariablesSection = ({ list, loading, hasError }: SimpleTablev1Props) => {
  return (<>
    <VariableSection />
  </>)
}