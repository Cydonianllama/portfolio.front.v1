import { ActivityActionerType, ActivityActionType, ActivityDTO, ActivityEntityType } from "@/api/activity/dto";
import { UseAppData } from "@/hooks/app/useAppData";
import { VscDebugDisconnect } from "react-icons/vsc";

import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns"

import {
  isToday,
  isYesterday,
  isThisWeek,
} from "date-fns";
import { LuDot } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ActivityItemProps = {
  data: ActivityDTO
}

type MessageLineResponse = {
  date: string;
  leftSide: {
    id: string,
    initials: string,
    url: string | null
  },
  text: Array<{
    text: string,
    urlTo: string | null
    strong?: boolean
  }>
  style: 'simple',
  icon: React.ReactElement
}

const MessageLine = (data: ActivityDTO): MessageLineResponse => {

  let icon = <><VscDebugDisconnect className="size-4  font-bold" /></>

  //
  // left side
  //

  const leftSide: {
    id: string,
    initials: string,
    url: string | null
  } = {
    id: '',
    initials: '',
    url: ''
  }

  if (data.actioner) {
    if (data.actioner.actionerType == ActivityActionerType.user) {
      leftSide.id = data.actioner.id
      leftSide.initials = getInitials(data.actioner.name || '')
    }
  }

  //
  // text
  //

  const text: Array<{
    text: string,
    urlTo: string | null
    strong?: boolean
  }> = []

  if (Array.isArray(data.entities)) {

    if (data.entities.length > 0) {
      // por el momento asumimos que un array tiene las mismas entidades
      const entity = data.entities[0].entityType

      if (entity == ActivityEntityType.integration) {

        icon = <><VscDebugDisconnect className="size-4  font-bold" /></>

        if (data.actionType == ActivityActionType.added) {
          text.push({
            text: `Agregó la integración`,
            urlTo: null,
            strong: false
          })
          text.push({
            text: data.entities[0].name || '',
            urlTo: null,
            strong: true
          })
        }
      }
      else if (entity == ActivityEntityType.automation) {
        icon = <><TiFlowMerge className="size-4  font-bold" /></>
        if (data.actionType == ActivityActionType.added) {
          text.push({
            text: `Agregó una automatización`,
            urlTo: null,
            strong: false
          })
          text.push({
            text: data.entities[0].name || '',
            urlTo: null,
            strong: true
          })
        }
      }

    }

  }

  if (!Array.isArray(data.entities) || data.entities?.length == 0) {
    text.push({
      text: `Actividad no reconocida`,
      urlTo: null,
      strong: false
    })
  }

  //
  // date
  //

  let date = ''
  if (data.creationDate) {
    date = formatActivityDate(data.creationDate)
  }

  const response: MessageLineResponse = {
    date: date || '',
    leftSide: leftSide,
    text: text,
    style: 'simple',
    icon: icon
  }


  return response;
}

type TextComponentProps = {
  data: {
    text: string,
    urlTo: string | null
    strong?: boolean
  }
}

const TextComponent = ({ data }: TextComponentProps) => {
  return <>
    {data.strong && (<strong>{data.text} </strong>)}
    {!data.strong && (<>{data.text} </>)}
  </>
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  const useAppData = UseAppData()

  const item = MessageLine(data)

  return (
    <>
      <div className="flex">
        <div className="mr-0 flex flex-col items-center px-4">
          <div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-gray-300 border-2">
              {item.icon}
            </div>
          </div>
          <div className="h-full w-px bg-gray-300 dark:bg-gray-500 border border-gray-300"></div>
        </div>
        <div className="pb-8 flex gap-2 items-center">
          {item.leftSide && (<>
            <div className="h-7 w-7 text-gray-600 font-semibold text-xs rounded-full  bg-gray-200 flex items-center justify-center">
              {item.leftSide.initials}
            </div>
          </>)}
          <p className="text-sm">
            {item.text.map((el, index) => (<TextComponent key={index} data={el} />))}
          </p>
          <LuDot />
          <div className="text-xs text-gray-500">
            {item.date}
          </div>
        </div>
      </div>
    </>
  )
}

function formatActivityDate(date: Date | string) {
  const creationDate = new Date(date);

  if (isToday(creationDate)) {
    return format(creationDate, "HH:mm");
  }

  if (isYesterday(creationDate)) {
    return "Ayer";
  }

  if (isThisWeek(creationDate, { weekStartsOn: 1 })) {
    return format(creationDate, "EEEE"); // lunes, martes...
  }

  return format(creationDate, "yyyy/MM/dd");
}

function getInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "";
  }

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();
}
