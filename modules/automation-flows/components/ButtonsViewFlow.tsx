import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { TiFlowMerge } from "react-icons/ti";
import { CiGrid42 } from "react-icons/ci";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonsViewFlowProps = {

}

export const ButtonsViewFlow = ({ }: ButtonsViewFlowProps) => {
  const appData = useAppData()

  return (
    <>
      <div className="flex items-center gap-2">
        <ButtonGroup>
          <Button variant="outline">
            <TiFlowMerge />
          </Button>
          <Button variant="outline">
            <CiGrid42 />
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}