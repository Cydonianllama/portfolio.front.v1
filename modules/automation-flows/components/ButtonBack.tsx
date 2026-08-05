import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { IoChevronBack } from "react-icons/io5";
import Link from 'next/link'
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonBackProps = {
  
}

export const ButtonBack = ({  }: ButtonBackProps) => {
  const useAppData = useAppData()

  return (
    <>
    <Link href={'/automation'} >
      <IoChevronBack />
    </Link>
    </>
  )
}