import { Link } from 'react-router-dom'

export const Welcome1: React.FC = () => {
  return (
    <div>
      1 <Link to="/welcome/2">下一页</Link>
    </div>
  )
}
