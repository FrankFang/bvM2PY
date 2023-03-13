import type { TimeRange } from '../components/TimeRangePicker'
import type { Time } from './time'
import { time } from './time'

const timeRangeMap: { [k in TimeRange['name']]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
}
export const timeRangeToStartAndEnd = (timeRange: TimeRange) => {
  let selected: Time, start: Time, end: Time
  switch (timeRange.name) {
    case 'thisMonth':
    case 'lastMonth':
    case 'twoMonthsAgo':
    case 'threeMonthsAgo':
      selected = time().add(timeRangeMap[timeRange.name], 'month')
      start = selected.firstDayOfMonth
      end = start.lastDayOfMonth.add(1, 'day')
      return { start, end }
    case 'thisYear':
      start = time().set({ month: 1 }).firstDayOfMonth
      end = time().add(1, 'year').set({ month: 1 }).firstDayOfMonth
      return { start, end }
    case 'custom':
      return { start: time(), end: time() }
  }
}
