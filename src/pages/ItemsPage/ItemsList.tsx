interface Props {
  items: Item[]
}
export const ItemsList: React.FC<Props> = ({ items }) => {
  return <div>
    <ol >
      {items.map(item =>
        <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px
          border-b-1 b="#EEE">
          <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px w-48px h-48px
            bg="#D8D8D8" rounded="50%" flex justify-center items-center>
            😘
          </div>
          <div row-start-1 col-start-2 row-end-2 col-end-3>
            旅行
          </div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">
            2011年1月1日
          </div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">
            ￥999
          </div>
        </li>
      )}
    </ol>
    <div p-16px>
      <button j-btn>加载更多</button>
    </div>
  </div>
}
