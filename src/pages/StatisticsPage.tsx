import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { useAjax } from '../lib/ajax'
import type { Time } from '../lib/time'
import { time } from '../lib/time'

type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: number; tag: Tag; amount: number }[]
const format = 'yyyy-MM-dd'
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format('yyyy-MM-dd')}&happened_before=${end.format('yyyy-MM-dd')}&kind=${kind}&group_by=${group_by}`
}
const timeRangeMap: { [k in TimeRange]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
}
export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<Item['kind']>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateStartEnd = () => {
    const selected: Time = time().add(timeRangeMap[timeRange], 'month')
    const start = selected.firstDayOfMonth
    const end = start.lastDayOfMonth.add(1, 'day')
    return { start, end }
  }
  const generateDefaultItems = (time: Time) => {
    return Array.from({ length: start.dayCountOfMonth }).map((_, i) => {
      const x = start.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = generateStartEnd()
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )
  const normalizedItems = defaultItems?.map((defaultItem, index) =>
    items?.find((item) => item.x === defaultItem.x) || defaultItem
  )
  const { data: items2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) =>
      (await get<{ groups: Groups2; total: number }>(path)).data.groups
        .map(({ tag_id, tag, amount }) =>
          ({ name: tag.name, value: (amount / 100).toFixed(2), sign: tag.sign }))
  )
  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <Icon name="back" />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange}
        timeRanges={[
          { key: 'thisMonth', text: '本月' },
          { key: 'lastMonth', text: '上月' },
          { key: 'twoMonthsAgo', text: '两个月前' },
          { key: 'threeMonthsAgo', text: '三个月前' },
        ]} />
      <div flex p-16px items-center gap-x-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} onChange={value => setKind(value)} disableError />
        </div>
      </div>
      <LineChart className="h-120px" items={normalizedItems} />
      <PieChart className="h-260px m-t-16px" items={items2} />
      <RankChart className="m-t-8px" items={items2} />
    </div>
  )
}
