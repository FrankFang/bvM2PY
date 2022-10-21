import * as React from 'react'
import { NavLink } from 'react-router-dom'
export const Welcome1: React.FC = () => {
  return (
    <div style={{ border: '1px solid red' }}> 1 <NavLink to="/welcome/2">下一页</NavLink> </div>
  )
}
