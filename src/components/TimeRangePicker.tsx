import { usePopup } from '../hooks/usePopup'
import type { Time } from '../lib/time'
import { time } from '../lib/time'
import { Tabs } from './Tabs'
export type TimeRange = {
  start: Time
  end: Time
  name:
  | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
  | 'twoMonthsAgo' | 'threeMonthsAgo'
}

const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  {
    text: '本月',
    key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '上月',
    key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '今年',
    key: { name: 'thisYear', start: time().set({ month: 1 }).firstDayOfMonth, end: time().set({ month: 12 }).lastDayOfMonth.add(1, 'day') },
  },
  {
    text: '自定义时间',
    key: { name: 'custom', start: time(), end: time() },
  },
]
type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: time(),
      end: time()
    })
  }
  const { popup, show } = usePopup({
    children: <div onClick={onConfirm}>弹框</div>,
    position: 'center'
  })
  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'custom') {
      // 弹框
      show()
    } else {
      _onSelect(timeRange)
    }
  }
  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
    </>
  )
}
