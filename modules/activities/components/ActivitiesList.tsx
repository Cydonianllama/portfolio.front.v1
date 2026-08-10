//
// compo - api - store
//

import { useActivities } from "../store/activitiesStore";
import { ErrorStateComponent } from "@/components/Error";
import { SpinnerListing } from "@/components/Listing";
import { EmptyStateComponent } from "@/components/Empty";
import { MdOutlineLabel } from "react-icons/md";
import { ActivityItem } from "./activityItem";
import { ActivityDTO, ActivityEntityType } from "@/api/activity/dto";
import { isToday, isYesterday, startOfWeek, endOfWeek } from "date-fns";
import { useMemo } from "react";

type TimeGroup = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'earlier'

const GROUP_LABELS: Record<TimeGroup, string> = {
  today: 'Hoy',
  yesterday: 'Ayer',
  thisWeek: 'Esta semana',
  lastWeek: 'La semana pasada',
  earlier: 'Anteriores',
}

const resolveTimeGroup = (date: Date): TimeGroup => {
  if (isToday(date)) return 'today'
  if (isYesterday(date)) return 'yesterday'

  const now = new Date()
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 })
  const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 })
  if (date >= thisWeekStart && date <= thisWeekEnd) return 'thisWeek'

  const lastWeekStart = new Date(thisWeekStart)
  lastWeekStart.setDate(thisWeekStart.getDate() - 7)
  const lastWeekEnd = new Date(thisWeekStart)
  if (date >= lastWeekStart && date < lastWeekEnd) return 'lastWeek'

  return 'earlier'
}

const groupActivitiesByTime = (items: Array<ActivityDTO>): Array<{ group: TimeGroup, items: Array<ActivityDTO> }> => {
  const groups = new Map<TimeGroup, Array<ActivityDTO>>()

  items.forEach((el) => {
    const group = resolveTimeGroup(new Date(el.creationDate))
    const current = groups.get(group) || []
    current.push(el)
    groups.set(group, current)
  })

  const order: Array<TimeGroup> = ['today', 'yesterday', 'thisWeek', 'lastWeek', 'earlier']
  return order
    .filter((group) => groups.has(group))
    .map((group) => ({ group, items: groups.get(group) || [] }))
}

const matchesEntityFilter = (item: ActivityDTO, filter: ActivityEntityType | 'all'): boolean => {
  if (filter == 'all') return true
  if (!Array.isArray(item.entities) || item.entities.length == 0) return false
  return item.entities[0].entityType == filter
}

export const ListActivitiesComponent = () => {

  const activitiesStore = useActivities()

  const isError = false;
  
  const grouped = useMemo(() => {
    const filtered = activitiesStore.list.filter((el) => matchesEntityFilter(el, activitiesStore.entityFilter))
    return groupActivitiesByTime(filtered)
  }, [activitiesStore.list, activitiesStore.entityFilter])

  const totalVisible = grouped.reduce((acc, group) => acc + group.items.length, 0)

  return <>
    <div className="">
      {activitiesStore.listing && (<>
        <SpinnerListing
          title="Items"
          description="Listando sus items."
        />
      </>)}

      {(!activitiesStore.listing && isError) && (<>
        <ErrorStateComponent
        />
      </>)}

      {(!activitiesStore.listing && !isError) && (<>
        {totalVisible > 0 && (<>
          <div className=" flex-1 space-y-6">
            {grouped.map(({ group, items }) => (
              <div key={group}>
                <div className="sticky top-0 z-10 flex items-center gap-2 py-1 mb-2 bg-background/90 backdrop-blur">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {GROUP_LABELS[group]}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-mist-50 border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {items.length}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-1">
                  {items.map((el, index) => (<ActivityItem data={el} key={index} isLast={index == items.length - 1} />))}
                </div>
              </div>
            ))}
          </div>
        </>)}

        {totalVisible == 0 && (<>
          <EmptyStateComponent
            description={activitiesStore.entityFilter == 'all'
              ? "Usted no cuenta con actividades registradas."
              : "No hay actividades para este filtro."}
            title="Actividades"
            isActiveCreate={false}
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => { }}
            textButtonCreate={'Agregar item'}
            mainIcon={<MdOutlineLabel />}
          />
        </>)}
      </>)}
    </div>
  </>
}




