/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { MembersSection_ } from "./members_scratch";

type SimpleTablev1Props = {
  list: Array<any>
  loading: boolean;
  hasError?: boolean;
}

export const MembersSection = ({ list, loading, hasError }: SimpleTablev1Props) => {
  return (<>
    <MembersSection_ />
  </>)
}