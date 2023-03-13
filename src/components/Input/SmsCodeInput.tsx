import { useEffect, useRef, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
  className?: string
}
const maxCount = 60
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { className, value, placeholder, onChange, request } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()
  const onClick = async () => {
    if (!request) { return }
    await request()
    setStarted(new Date())
  }
  const clearTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = undefined
    }
  }
  useEffect(() => {
    if (!started) {
      clearTimer()
      return
    }
    timer.current = window.setInterval(() => {
      const seconds = Math.round((new Date().getTime() - started.getTime()) / 1000)
      const count = maxCount - seconds
      if (count < 0) { setStarted(undefined) }
      setCount(count)
    }, 1000)
    return clearTimer
  }, [started])

  return (
    <div flex gap-x-16px className={className}>
      <input shrink-1 j-input-text type="text" placeholder={placeholder} max-w="[calc(40%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" max-w="[calc(60%-8px)]" shrink-0 j-btn disabled text-gray>
          {count}秒后可重发
        </button>
        : <button type="button" max-w="[calc(60%-8px)]" shrink-0 j-btn onClick={onClick}>
          发送验证码
        </button>
      }
    </div>
  )
}
