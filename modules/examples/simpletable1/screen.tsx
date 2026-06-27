import { listMockData } from "./mockData"
import { SimpleTablev1 } from "./table"

export const SimpleTable1 = () => {
  return(<>
    <div className="p-20 justify-center flex items-center">
      <SimpleTablev1 list={listMockData} loading={false} hasError={false} />  
    </div>
  </>)
}