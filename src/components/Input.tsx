import type { ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'

type Props = {
  label?: string | ReactNode
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disableError?: boolean
} & (
    | { type?: 'text' }
    | { type: 'emoji' }
    | { type: 'sms_code'; request: () => Promise<unknown> }
    | { type: 'select'; options: { value: string; text: string }[] }
  )
export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type, value, onChange, error, disableError } = props
  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input j-input-text type={type} placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)} />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'select':
        return <select value={value} onChange={e => onChange?.(e.target.value)}
          className="h-36px">
          {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>)
          }
        </select>
      case 'sms_code':
        return <SmsCodeInput value={value} onChange={onChange} placeholder={placeholder}
          request={props.request} />
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px>
        {label ? <span text-18px>{label}</span> : null}
        {renderInput()}
        {disableError ? null : <span text-red text-12px>{error || '　'}</span>}
      </div>
    </>
  )
}
