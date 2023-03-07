import { Tabs } from './Tabs'
export type TimeRange =
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]
type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect, timeRanges = defaultTimeRanges } = props
  return (
    <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
  )
}
