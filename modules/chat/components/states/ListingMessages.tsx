import { Skeleton } from "@/components/ui/skeleton"

const SkelletonCard = () => {
  return <div className="flex w-fit items-center gap-4">
    <Skeleton className="size-10 shrink-0 rounded-full" />
    <div className="grid gap-2">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
  </div>
}

export const ListingMessages = () => {
  return (<>
    <div className='flex flex-col gap-5 min-h-0 gap-5 py-2 flex-1 overflow-auto '>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
      <SkelletonCard/>
    </div>
  </>)
}