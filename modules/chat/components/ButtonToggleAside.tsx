import { Button } from "@/components/ui/button"
import { RxHamburgerMenu } from "react-icons/rx"

type ButtonToggleAsideProps = {
  HandleToggleAsideListConversations: () => void
}

export const ButtonToggleAside = ({ HandleToggleAsideListConversations } : ButtonToggleAsideProps) => {
  return (<>
    <Button className={'cursor-pointer'} onClick={HandleToggleAsideListConversations} variant={'ghost'} size={'icon'}>
      <RxHamburgerMenu />
    </Button>
  </>)
}