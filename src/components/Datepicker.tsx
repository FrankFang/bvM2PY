import { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  onCancel?: () => void
  onConfirm?: (value: Date) => void
}
const getNow = () => time().set({ hours: 0, minutes: 0, seconds: 0, ms: 0 })
export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value, onCancel, onConfirm } = props
  const startTime = start ? time(start) : getNow().add(-10, 'years')
  const endTime = end ? time(end) : getNow().add(10, 'year')
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const [, update] = useState({})
  const valueTime = useRef(value ? time(value).set({ hours: 0, minutes: 0, seconds: 0, ms: 0 }) : getNow())
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)
  const hoursList = Array.from({ length: 24 }).map((_, index) => index)
  const minutesList = Array.from({ length: 60 }).map((_, index) => index)
  return (
    <div>
      <div flex justify-between p-8px border-b-1 b-b-solid b="#f3f3f3" children-p-8px>
        <span onClick={onCancel}>取消</span>
        <span>时间选择</span>
        <span onClick={() => onConfirm?.(valueTime.current.date)}>确定</span>
      </div>
      <div flex children-grow-1 text-center children-p-16px>
        <span>年</span>
        <span>月</span>
        <span>日</span>
        <span>时</span>
        <span>分</span>
      </div>
      <div flex>
        <Column className="grow-1" items={yearList} value={valueTime.current.year}
          onChange={v => { valueTime.current.year = v; update({}) }} />
        <Column className="grow-1" items={monthList} value={valueTime.current.month}
          onChange={v => { valueTime.current.month = v; update({}) }} />
        <Column className="grow-1" items={dayList} value={valueTime.current.day}
          onChange={v => { valueTime.current.day = v; update({}) }} />
        <Column className="grow-1" items={hoursList} value={valueTime.current.hours}
          onChange={v => { valueTime.current.hours = v; update({}) }} />
        <Column className="grow-1" items={minutesList} value={valueTime.current.minutes}
          onChange={v => { valueTime.current.minutes = v; update({}) }} />
      </div>
    </div>
  )
}

type ColumnProps = {
  className?: string
  itemHeight?: number
  items: number[]
  value: number
  onChange: (value: number) => void
}
export const Column: React.FC<ColumnProps> = (props) => {
  const { items, itemHeight = 36, className, value, onChange } = props
  useEffect(() => {
    const index = items.indexOf(value)
    setTranslateY(index * -itemHeight)
  }, [value])
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const index = items.indexOf(value)
  const [translateY, _setTranslateY] = useState(index * -itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (items.length - 1) * -itemHeight)
    _setTranslateY(y)
  }
  return (
    <div className={className} h="50vh" overflow-hidden relative
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
        const remainder = translateY % itemHeight
        let y = translateY - remainder
        if (Math.abs(remainder) > 18) {
          y += itemHeight * (remainder > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div border-b-1 border-t-1 b-t-solid b-b-solid b="#eee" absolute top="50%" w-full
        style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} />
      <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }}>
        <ol style={{ transform: `translateY(${translateY}px)` }} text-center children-flex children-items-center children-justify-center>
          {items.map(item =>
            <li key={item} style={{ height: itemHeight }}>{item}</li>
          )}
        </ol>
      </div>
    </div>
  )
}
