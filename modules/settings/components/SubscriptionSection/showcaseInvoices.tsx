/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import { TableInvoices } from "./TableInvoices";

type ShowcaseInvoicesProps = {

}

export const ShowcaseInvoices = ({ }: ShowcaseInvoicesProps) => {
  const useAppData = UseAppData()
  return (
    <>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-lg font-semibold">Invoices</h1>
        <div>
          Why so lonely
        </div>
      </div>
      <TableInvoices list={[]} loading={false} hasError={false} />
    </>
  )
}