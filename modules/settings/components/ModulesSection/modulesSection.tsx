import { UseAppData } from "@/hooks/app/useAppData";
import { EntitySection } from "./scratch_entity";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModulesSectionProps = {
  
}

export const ModulesSection = ({  }: ModulesSectionProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <EntitySection />
    </>
  )
}