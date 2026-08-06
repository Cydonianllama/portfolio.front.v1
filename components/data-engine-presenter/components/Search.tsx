import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { IoSearch } from "react-icons/io5"

export function Search() {
  return (<>
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <IoSearch />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  </>)
}