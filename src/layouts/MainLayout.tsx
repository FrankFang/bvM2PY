import { Navigate, Outlet } from 'react-router-dom'
export const MainLayout: React.FC = () => {
  const hasRead = localStorage.getItem('hasReadWelcomes')
  if (hasRead === 'yes') {
    return <Navigate to="/home" />
  } else {
    return <div><Outlet /></div>
  }
}
