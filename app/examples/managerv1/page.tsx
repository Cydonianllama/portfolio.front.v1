"use server";

import { Managerv1Screen } from "@/modules/example1/components/screen";

export default async function Page() {
  return (<>
    <div className="h-[100vh]">
      <Managerv1Screen/>
    </div>
  </>);
}
