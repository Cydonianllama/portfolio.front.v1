/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "../../../components/ui/button";
import { useContext } from "react";
import { MdFilterList } from "react-icons/md";
import { dataEngineUIContext } from "../contexts/dataEngineUIContext";

type FilterProps = {
  
}

export function Filter(data: FilterProps){

  const dataEngineUI = useContext(dataEngineUIContext)

  const HandleClick = () => {
    dataEngineUI.setOpenViewDataConfig(!dataEngineUI.openViewDataConfig)
  }

  return(<>
    <Button onClick={HandleClick} variant={'outline'} size={'icon-sm'}>
      <MdFilterList/>
    </Button>
  </>)
}