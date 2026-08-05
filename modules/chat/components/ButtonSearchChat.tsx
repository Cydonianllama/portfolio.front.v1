import { Button } from "@/components/ui/button"
import { IoSearch } from "react-icons/io5"

export const ButtonSearchChat = () => {
  return (<>
    <Button variant={'ghost'} size={'icon'}>
      <IoSearch />
    </Button>
  </>)
}