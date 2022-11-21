import React from 'react'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

interface Props {
  onClickMask?: () => void
}
export const TopMenu: React.FC<Props> = (props) => {
  const { onClickMask } = props
  return (
    <>
      <div fixed top-0 left-0 w="100%" h="100%" className="bg-black:75"
        z="[calc(var(--z-menu)-1)]" onClick={onClickMask}
      />
      <div fixed top-0 left-0 w="70vw" max-w-20em h-screen flex flex-col b-3px b-red
        z="[var(--z-menu)]">
        <CurrentUser className="grow-0 shrink-0" />
        <Menu className="grow-1 shrink-1" />
      </div>
    </>
  )
}
