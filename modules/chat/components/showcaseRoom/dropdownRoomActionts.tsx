import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiDotsVertical } from "react-icons/hi"

export const DropdownRoomActions = () => {
  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger nativeButton={false} render={(
        <HiDotsVertical />
      )}></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Elimiar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}