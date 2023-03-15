import { Datepicker } from '../../components/Datepicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

type Props = {
  value?: string | Date
  onChange?: (date: string) => void
}
export const ItemDate: React.FC<Props> = (props) => {
  const { value, onChange } = props
  const { toggle, popup, hide } = usePopup({
    children: <Datepicker
      onConfirm={d => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <span flex items-center gap-x-8px onClick={toggle}>
        <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
        <span grow-0 shrink-0 color="#999">{time(value).format('yyyy-MM-dd HH:mm')}</span>
      </span>
    </>
  )
}
