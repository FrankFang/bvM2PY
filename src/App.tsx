import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { useEffect } from 'react'
import styled from 'styled-components'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { useLoadingStore } from './stores/useLoadingStore'
import { Icon } from './components/Icon'
import { usePopup } from './hooks/usePopup'
vhCheck()
export const App: React.FC = () => {
  const { visible } = useLoadingStore()
  const { popup, hide, show } = usePopup({
    children: <div p-16px>
      <Spin className="w-32px h-32px" name="loading" />
    </div>,
    position: 'center'
  })
  useEffect(() => {
    visible ? show() : hide()
  }, [visible])

  return (
    <div>
      <RouterProvider router={router} />
      {popup}
    </div>
  )
}

const Spin = styled(Icon)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
