import type { ReactNode, TouchEvent } from 'react'
import { useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onEnd?: () => void
}
export const LongPressable: React.FC<Props> = (props) => {
  const { children, className, onEnd } = props
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number; y?: number }>({ x: undefined, y: undefined })
  const onTouchStart = (e: TouchEvent) => {
    touchTimer.current = window.setTimeout(() => {
      onEnd?.()
    }, 500)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }
  const onTouchMove = (e: TouchEvent) => {
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)
    if (distance > 10) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  return (
    <div className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}>
      {children}
    </div>
  )
}
