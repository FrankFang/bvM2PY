export const ItemsSummary: React.FC = () => {
  return (
    <ol bg="#252A43" flex justify-between items-center m-16px rounded-8px py-12px px-16px
      children-px-24px text-center>
      <li text="#FE7275">
        <div>收入</div>
        <div>1000</div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div>1000</div>
      </li>
      <li text-white>
        <div>净收入</div>
        <div>1000</div>
      </li>
    </ol>
  )
}
