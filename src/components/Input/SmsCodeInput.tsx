import { useEffect, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange, request } = props
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(5)
  const onClick = async () => {
    if (!request) { return }
    await request()
    setStarted(true)
  }
  useEffect(() => {
    if (!started) { return }
    if (count === -1) {
      setStarted(false)
      setCount(5)
      return
    }
    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [started, count])

  return (
    <div flex gap-x-16px>
      <input shrink-1 j-input-text type="text" placeholder={placeholder} max-w="[calc(40%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" max-w="[calc(60%-8px)]" shrink-0 j-btn>{count}</button>
        : <button type="button" max-w="[calc(60%-8px)]" shrink-0 j-btn onClick={onClick}>
          发送验证码
        </button>
      }
    </div>
  )
}
