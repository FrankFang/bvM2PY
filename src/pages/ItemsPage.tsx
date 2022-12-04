import React, { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()

  return (
    <div>
      <Gradient>
        <TopNav title="账目列表" icon={
          <Icon name="menu" className="w-24px h-24px"
            onClick={() => { setVisible(!visible) }} />
        } />
        <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      </Gradient>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />
    </div>
  )
}
