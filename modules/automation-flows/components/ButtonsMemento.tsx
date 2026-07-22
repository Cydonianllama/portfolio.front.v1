import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { RiArrowGoBackLine } from "react-icons/ri";
import { RiArrowGoForwardFill } from "react-icons/ri";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonsMementoProps = {

}

export const ButtonsMemento = ({ }: ButtonsMementoProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant={'outline'} size={'icon'}>
          <RiArrowGoBackLine />
        </Button>
        <Button variant={'outline'} size={'icon'}>
          <RiArrowGoForwardFill />
        </Button>
      </div>
    </>
  )
}