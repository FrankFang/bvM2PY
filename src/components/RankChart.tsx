type Props = {
  className?: string
  items?: { name: string; value: number; sign: string }[]
}
export const RankChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const renderItems = () => {
    return (
      items?.map(item =>
        <div grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]"
          text-12px items-center gap-y-6px gap-x-8px px-16px my-8px>
          <div row-start-1 col-start-1 row-end-3 col-end-2
            w-48px h-48px rounded-24px bg="#EFEFEF" flex justify-center items-center
            text-24px>{item.sign}</div>
          <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>{item.name}</div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end>{item.value}</div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 bg-red h-8px self-start></div>
        </div>)
    )
  }
  return (
    <div className={className}>{
      items
        ? renderItems()
        : <div>暂无数据</div>
    }</div>
  )
}
