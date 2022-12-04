import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const ItemsNewPage: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
    </div>
  )
}
