import { useCallback, useEffect, useState } from "react"
import { FaCheck, FaRegCopy } from "react-icons/fa"
import { Button } from "../ui/button"

// IdShower
type ShowcaseIdProps = {
  id: string
  width?: number
}

export const ShowcaseId = ({ id, width = 90 }: ShowcaseIdProps) => {
  const [copied, setCopied] = useState(false)

  const copyTextToClipboard = useCallback(() => {
    if (copied) return;

    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(id).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      setCopied(true)
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }, [copied, id])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1200)
    }

    return () => {

    }
  }, [copied])

  return <>
    <div className='flex gap-1 p-1 rounded-sm bg-gray-100 items-center w-fit'>
      <div className={`overflow-hidden text-ellipsis text-foreground text-xs`} style={{ width: width }}>
        {id}
      </div>
      <Button onClick={copyTextToClipboard} className={'text-muted-foreground cursor-pointer text-xs'} variant={'ghost'} size={'icon-sm'} >
        {copied && (<FaCheck />)}
        {!copied && (<FaRegCopy />)}
      </Button>
    </div>
  </>
}