import { ActivityActionType, ActivityDTO, ActivityEntityType } from "@/api/activity/dto";
import { UseAppData } from "@/hooks/app/useAppData";
import { VscDebugDisconnect } from "react-icons/vsc";

import {
  format,
} from "date-fns"

import {
  isToday,
  isYesterday,
  isThisWeek,
} from "date-fns";
import { LuDot } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ActivityItemProps = {
  data: ActivityDTO
  isLast?: boolean
}

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
]

const getAvatarColor = (id: string): string => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

const entityBadgeStyles: Record<ActivityEntityType, { className: string; lineClass: string }> = {
  [ActivityEntityType.integration]: { className: "bg-blue-100 text-blue-700", lineClass: "bg-blue-400" },
  [ActivityEntityType.automation]: { className: "bg-violet-100 text-violet-700", lineClass: "bg-violet-400" },
  [ActivityEntityType.contact]: { className: "bg-emerald-100 text-emerald-700", lineClass: "bg-emerald-400" },
  [ActivityEntityType.room]: { className: "bg-amber-100 text-amber-700", lineClass: "bg-amber-400" },
  [ActivityEntityType.none]: { className: "bg-gray-100 text-gray-500", lineClass: "bg-gray-300" },
}

type MessageLineResponse = {
  date: string;
  fullDate: string;
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
  entityType: ActivityEntityType
}

const MessageLine = (data: ActivityDTO): MessageLineResponse => {

  let icon = <><VscDebugDisconnect className="size-4 font-bold" /></>

  let entityType = ActivityEntityType.none

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
    if (data.actioner.actionerType == 'user') {
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
      entityType = entity

      if (entity == ActivityEntityType.integration) {

        icon = <><VscDebugDisconnect className="size-4 font-bold" /></>

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
        icon = <><TiFlowMerge className="size-4 font-bold" /></>
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
      else if (entity == ActivityEntityType.contact) {
        icon = <><FaUser className="size-3.5" /></>
        if (data.actionType == ActivityActionType.create) {
          text.push({
            text: `Creó el contacto`,
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
      else if (entity == ActivityEntityType.room) {
        icon = <><FiMessageSquare className="size-3.5" /></>
        if (data.actionType == ActivityActionType.create) {
          text.push({
            text: `Creó la sala`,
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
  let fullDate = ''
  if (data.creationDate) {
    date = formatActivityDate(data.creationDate)
    fullDate = format(new Date(data.creationDate), "dd/MM/yyyy HH:mm")
  }

  const response: MessageLineResponse = {
    date: date || '',
    fullDate: fullDate || '',
    leftSide: leftSide,
    text: text,
    style: 'simple',
    icon: icon,
    entityType: entityType
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
    {data.strong && (<strong className="text-foreground">{data.text} </strong>)}
    {!data.strong && (<>{data.text} </>)}
  </>
}

export const ActivityItem = ({ data, isLast }: ActivityItemProps) => {
  const useAppData = UseAppData()

  const item = MessageLine(data)

  const entityBadge = entityBadgeStyles[item.entityType]?.className || entityBadgeStyles[ActivityEntityType.none].className
  const entityLine = entityBadgeStyles[item.entityType]?.lineClass || entityBadgeStyles[ActivityEntityType.none].lineClass

  return (
    <>
      <div className="flex text-foreground">
        <div className="mr-0 flex flex-col items-center pr-4">
          <div>
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-transparent ${entityBadge}`}>
              {item.icon}
            </div>
          </div>
          {!isLast && (<div className={`h-full w-[2px] ${entityLine}`}></div>)}
        </div>
        <div className={`${isLast ? '' : 'pb-8'} flex gap-2 items-center`}>
          {item.leftSide && item.leftSide.id && (<>
            <div className={`h-7 w-7 text-xs font-semibold rounded-full flex items-center justify-center ${getAvatarColor(item.leftSide.id)}`}>
              {item.leftSide.initials}
            </div>
          </>)}
          <p className="text-sm">
            {item.text.map((el, index) => (<TextComponent key={index} data={el} />))}
          </p>
          <LuDot className="text-muted-foreground" />
          <div className="text-xs text-muted-foreground" title={item.fullDate}>
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
