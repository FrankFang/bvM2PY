type Props = {
  kind: Item['kind']
}
export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 99 })
  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px
      gap-y-16px py-16px px-8px>
        {tags.map(tag =>
          <li w-48px h-48px b-1 b-red flex justify-center items-center>😶</li>
        )}
      </ol>
    </div>
  )
}
