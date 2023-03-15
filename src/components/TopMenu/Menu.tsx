import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../Icon'

interface Props {
  className?: string
}

const MyIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`

const items = [
  { icon: 'pig', text: '记账', to: '/items' },
  { icon: 'chart', text: '统计图表', to: '/statistics' },
  { icon: 'export', text: '导出数据', to: '/export' },
  { icon: 'noty', text: '记账提醒', to: '/noty' },
]
export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <ul className={className} bg-white text-20px py-16px >
      {items.map(item =>
        <li key={item.to}>
          <NavLink flex items-center px-16px py-8px mb-4px to={item.to}>
            <MyIcon name={item.icon} />{item.text}
          </NavLink>
        </li>
      )}
    </ul>
  )
}
