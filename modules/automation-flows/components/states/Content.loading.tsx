import { useAppData } from "@/hooks/app/useAppData";
import { Skeleton } from "@/components/ui/skeleton"


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ContentLoadingProps = {

}

export const ContentLoading = ({ }: ContentLoadingProps) => {
  const appData = useAppData()

  return (
    <>
      <div className="h-full w-full relative flex justify-center item-center">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </>
  )
}