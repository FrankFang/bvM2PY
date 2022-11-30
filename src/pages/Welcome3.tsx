import { Link } from 'react-router-dom'
import p from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div text-center>
      <img src={p} w-130px h-108px />
      <h2 text-32px mt-48px >
        数据可视化 <br />
        收支一目了然
      </h2>
      <div mt-64px>
        <Link text-32px color="#6035BF" font-bold to="/welcome/4">下一页</Link>
      </div>
    </div>
  )
}
