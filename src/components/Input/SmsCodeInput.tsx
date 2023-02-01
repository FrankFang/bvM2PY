type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange, request } = props
  const onClick = async () => {
    if (!request) { return }
    await request()
    // 开始倒计时
  }
  return (
    <div flex gap-x-16px>
      <input shrink-1 j-input-text type="text" placeholder={placeholder} max-w="[calc(40%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" max-w="[calc(60%-8px)]" shrink-0 j-btn onClick={onClick}>发送验证码</button>
    </div>
  )
}
