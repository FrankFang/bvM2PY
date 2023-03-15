import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px py-48px h-screen px-48px>
      <Icon name="pig" className="w-128px h-128px" />
      <h1>敬请期待</h1>
      <button j-btn onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
