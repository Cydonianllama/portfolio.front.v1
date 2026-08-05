import { useAppData } from "@/hooks/app/useAppData";
import { EntityScreen } from "./components/entity/entityScreen";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModulesSectionProps = {
  
}

export const ModulesSection = ({  }: ModulesSectionProps) => {
  const appData = useAppData()

  return (
    <>
      <EntityScreen />
    </>
  )
}