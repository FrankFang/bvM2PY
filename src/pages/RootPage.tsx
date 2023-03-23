import { Navigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'
export const RootPage: React.FC = () => {
  const { hasReadWelcomes } = useLocalStore()
  if (hasReadWelcomes) {
    return <Navigate to="/home" />
  } else {
    return <Navigate to="/welcome/1" />
  }
}
