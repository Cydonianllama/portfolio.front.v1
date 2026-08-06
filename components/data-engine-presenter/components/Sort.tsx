import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { dataEngineUIContext } from "../contexts/dataEngineUIContext";

export function Sort() {

  const dataEngineUI = useContext(dataEngineUIContext)

  const HandleClick = () => {
    dataEngineUI.setOpenViewDataConfig(!dataEngineUI.openViewDataConfig)
  }

  return (<>
    <Button onClick={HandleClick} variant={'outline'} size={'icon-sm'}>
      <BiSortAlt2 />
    </Button>
  </>)
}