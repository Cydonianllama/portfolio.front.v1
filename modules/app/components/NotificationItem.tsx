import { useAppData } from "@/hooks/app/useAppData"
import { InboxIcon } from "lucide-react"
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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { NotificationDTO, NotificationEntityActioner, NotificationEntityTypes, NotificationTypes } from "@/api/notification/dto";
import { VscDebugDisconnect } from "react-icons/vsc";
import { TbUsersPlus } from "react-icons/tb";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationItemProps = {
  data: NotificationDTO
}

export const NotificationItem = ({ data }: NotificationItemProps) => {
  const appData = useAppData()
  const info = MessageLine(data)

  return (
    <>
      <Item size={'xs'} variant="muted" className="cursor-pointer select-none">
        <ItemMedia variant="icon">
          {info.icon}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{info.title}</ItemTitle>
          <ItemDescription>
            {info.text.map((el, index) => <TextComponent key={index} data={el} />)}
          </ItemDescription>
        </ItemContent>
      </Item>
    </>
  )
}

type MessageLineResponse = {
  date: string;
  leftSide: {
    id: string,
    initials: string,
    url: string | null
  },
  title: string,
  text: Array<{
    text: string,
    urlTo: string | null
    strong?: boolean
  }>
  style: 'simple',
  icon: React.ReactElement
}

const MessageLine = (data: NotificationDTO): MessageLineResponse => {

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
    if (data.actioner.entity == NotificationEntityActioner.user) {
      leftSide.id = data.actioner.id
      leftSide.initials = getInitials(data.actioner.name || '')
    }
  }

  //
  // text and title
  //

  let title = ''

  const text: Array<{
    text: string,
    urlTo: string | null
    strong?: boolean
  }> = []

  if (Array.isArray(data.entities)) {

    if (data.entities.length > 0) {
      // por el momento asumimos que un array tiene las mismas entidades
      const entity = data.entities[0].entity

      if (entity == NotificationEntityTypes.member) {
        icon = <><TbUsersPlus className="size-4  font-bold" /></>
        if (data.type == NotificationTypes.addedMember) {
          title = 'Se ha agregado un nuevo miembro'
          text.push({
            text: `Agregó un miembro`,
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

      if (entity == NotificationEntityTypes.none) {
        icon = <><TbUsersPlus className="size-4  font-bold" /></>
        if (data.type == NotificationTypes.userVerifiedAccount) {
          title = 'Bienvenido'
          text.push({
            text: data.entities[0].name,
            urlTo: null,
            strong: true
          })
          text.push({
            text: ' Te damos la bienvenida a esta plataforma.',
            urlTo: null,
            strong: false
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
    icon: icon,
    title
  }


  return response;
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