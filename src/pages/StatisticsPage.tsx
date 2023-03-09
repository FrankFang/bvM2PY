import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
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
import { time } from '../lib/time'

type Groups = { happen_at: string; amount: number }[]
const format = 'yyyy-MM-dd'
export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateStartEndAndDefaultItems = () => {
    const defaultItems: { x: string; y: number }[] = []
    if (timeRange === 'thisMonth') {
      const startTime = time().firstDayOfMonth
      const start = startTime.format(format)
      const endTime = time().lastDayOfMonth.add(1, 'day')
      const end = endTime.format(format)
      for (let i = 0; i < startTime.dayCountOfMonth; i++) {
        const x = startTime.clone.add(i, 'day').format(format)
        defaultItems.push({ x, y: 0 })
      }
      return { start, end, defaultItems }
    } else {
      return { start: '', end: '', defaultItems }
    }
  }
  const { start, end, defaultItems } = generateStartEndAndDefaultItems()
  const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by=happen_at`,
    async (path) =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: amount }))
  )
  const normalizedItems = defaultItems?.map((defaultItem, index) =>
    items?.find((item) => item.x === defaultItem.x) || defaultItem
  )
  const items2 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ x: item.tag.name, y: item.amount / 100 }))
  const items3 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
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
      <div>{timeRange}</div>
      <LineChart className="h-120px" items={normalizedItems} />
      <PieChart className="h-260px m-t-16px" items={items2} />
      <RankChart className="m-t-8px" items={items3} />
    </div>
  )
}
