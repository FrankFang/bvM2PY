import * as React from 'react'
import { NavLink } from 'react-router-dom'
export const Welcome3: React.FC = () => {
  return (
    <div style={{ border: '1px solid red' }}> 3 <NavLink to="/welcome/4">下一页</NavLink> </div>
  )
}
