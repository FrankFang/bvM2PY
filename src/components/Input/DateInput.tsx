import React from 'react'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { Datepicker } from '../Datepicker'

type Props = {
  value?: string
  onChange?: (v: string) => void
  className?: string
  placeholder?: string
}
export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, className, placeholder } = props
  const { toggle, popup, hide } = usePopup({
    children: <Datepicker
      onConfirm={d => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <input className={className} j-input-text type="text" readOnly data-xxxx
        placeholder={placeholder} value={time(value).format()} onClick={toggle} />
    </>
  )
}
