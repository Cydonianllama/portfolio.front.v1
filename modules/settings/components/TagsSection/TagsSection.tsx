import { UseAppData } from "@/hooks/app/useAppData";
import { TagSection } from "./scratch_tags";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TagsSectionProps = {
  
}

export const TagsSection = ({  }: TagsSectionProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <TagSection />
    </>
  )
}