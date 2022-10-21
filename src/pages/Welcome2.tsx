import * as React from 'react'
import { NavLink } from 'react-router-dom'
export const Welcome2: React.FC = () => {
  return (
    <div style={{ border: '1px solid red' }}> 2 <NavLink to="/welcome/3">下一页</NavLink> </div>
  )
}
