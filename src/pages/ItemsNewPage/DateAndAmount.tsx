import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'

type Props = {
  className?: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)
  const { toggle, popup } = usePopup(true, <div h="50vh" overflow-hidden relative
    onTouchStart={(e) => {
      setIsTouching(true)
      setLastY(e.touches[0].clientY)
    }}
    onTouchMove={(e) => {
      if (isTouching) {
        const y = e.touches[0].clientY
        const dy = y - lastY
        setTranslateY(translateY + dy)
        setLastY(y)
      }
    }}
    onTouchEnd={() => {
      setIsTouching(false)
    }}
  >
    <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full />
    <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full>
      <ol style={{ transform: `translateY(${translateY}px)` }}
        children-h-36px text-center children-leading-36px>
        <li>2000</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
        <li>2000</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
      </ol>
    </div>
  </div>)
  return (
    <>
      {popup}
      <div className={className}>
        <div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
          <span flex items-center gap-x-8px onClick={toggle}>
            <Icon name="calendar" className="w-24px h-24px grow-0 shrink-0" />
            <span grow-0 shrink-0 text-12px color="#999">2001-02-03</span>
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
