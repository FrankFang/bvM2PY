import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { Datepicker } from '../../components/Datepicker'
import { time } from '../../lib/time'

type Props = {
  className?: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date())
  const { className } = props
  const { toggle, popup, hide } = usePopup(false, <Datepicker
    onConfirm={d => { setDate(d); hide() }}
    onCancel={() => hide()} />)
  return (
    <>
      {popup}
      <div className={className}>
        <div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
          <span flex items-center gap-x-8px onClick={toggle}>
            <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
            <span grow-0 shrink-0 color="#999">{time(date).format()}</span>
          </span>
          <code grow-1 shrink-1 text-right color="#53A867">123456789.01</code>
        </div>
        <div py-1px grid
          grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,56px)]" bg="#ddd" gap-1px
          children-b-none
          children-bg-white>
          <button row-start-1 col-start-1 row-end-2 col-end-2>1</button>
          <button row-start-1 col-start-2 row-end-2 col-end-3>2</button>
          <button row-start-1 col-start-3 row-end-2 col-end-4>3</button>
          <button row-start-2 col-start-1 row-end-3 col-end-2>4</button>
          <button row-start-2 col-start-2 row-end-3 col-end-3>5</button>
          <button row-start-2 col-start-3 row-end-3 col-end-4>6</button>
          <button row-start-3 col-start-1 row-end-4 col-end-2>7</button>
          <button row-start-3 col-start-2 row-end-4 col-end-3>8</button>
          <button row-start-3 col-start-3 row-end-4 col-end-4>9</button>
          <button row-start-4 col-start-1 row-end-5 col-end-3>0</button>
          <button row-start-4 col-start-3 row-end-5 col-end-4>.</button>
          <button row-start-1 col-start-4 row-end-3 col-end-5>清空</button>
          <button row-start-3 col-start-4 row-end-5 col-end-5>提交</button>
        </div>
      </div>
    </>
  )
}
