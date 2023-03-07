import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

export const BackIcon: React.FC = () => {
  const nav = useNavigate()
  const onBack = () => {
    nav(-1)
  }
  return (
    <Icon name="back" onClick={onBack} />
  )
}
