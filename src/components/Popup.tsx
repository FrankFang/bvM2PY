import { animated, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
}
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask, children } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  })
  const maskStyles2 = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  } // workaround
  return (
    <div touch-none>
      <animated.div fixed top-0 left-0 h-full w-full className="bg-black:75"
        z="[calc(var(--z-popup)-1)]" onClick={() => onClickMask?.()}
        style={maskStyles2} />
      <animated.div fixed bottom-0 left-0 w-full min-h-100px bg-white
        z="[calc(var(--z-popup))]"
        style={menuStyles} rounded-t-8px overflow-hidden>
        {children}
      </animated.div>
    </div>
  )
}

