import type { ReactNode } from 'react'
import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import s from './ItemsNewPage.module.scss'

type ItemKind = 'income' | 'expenses'
export const ItemsNewPage: React.FC = () => {
  const tabItems: { key: ItemKind; text: string; element?: ReactNode }[]
    = [
      { key: 'expenses', text: '支出', element: <div>支出</div> },
      { key: 'income', text: '收入', element: <div>收入</div> }
    ]
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
  return (
    <div className={s.wrapper}>
      <Gradient>
        <TopNav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs tabItems={tabItems} className="text-center" classPrefix='itemsNewPage'
        value={tabItem}
        onChange={(tabItem) => { setTabItem(tabItem) }} />
    </div>
  )
}
