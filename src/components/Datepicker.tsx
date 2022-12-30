import { useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
}
export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value, itemHeight = 36 } = props
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'year')
  const valueTime = value ? time(value) : time()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const index = yearList.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(index * -itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, (yearList.length - 1) * -itemHeight)
    _setTranslateY(y)
  }
  return (
    <div h="50vh" overflow-hidden relative
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
      }}
    >
      <div b-1 b-red absolute top="50%" w-full
        style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} />
      <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }}>
        <ol style={{ transform: `translateY(${translateY}px)` }} text-center children-flex children-items-center children-justify-center>
          {yearList.map(year =>
            <li key={year} style={{ height: itemHeight }}>{year}</li>
          )}
        </ol>
      </div>
    </div>
  )
}
