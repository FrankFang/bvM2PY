import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'

type Props = {
  kind: Item['kind']
  value?: Item['tag_ids']
  onChange?: (ids: Item['tag_ids']) => void
}
export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 91 }).map<Tag>((tag, index) => ({
    id: index,
    name: `打车${index}`,
    kind: 'expenses',
    sign: '😶',
    user_id: 1,
    created_at: '2000-01-01T00:00:00.000Z',
    updated_at: '2000-01-01T00:00:00.000Z',
    deleted_at: null
  }))
  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px
        gap-y-16px py-16px px-8px>
        <li>
          <Link to={`/tags/new?kind=${kind}`}>
            <span block w-48px h-48px rounded="24px" bg="#EFEFEF"
              flex justify-center items-center text-24px text="#8F4CD7"
            ><Icon name="add" /></span>
          </Link>
        </li>
        {tags.map((tag, index) =>
          <li key={index} w-48px flex justify-center items-center flex-col gap-y-8px
            onClick={() => { props.onChange?.([tag.id]) }}>
            {props.value?.includes(tag.id)
              ? <span block w-48px h-48px rounded="24px" bg="#EFEFEF"
                flex justify-center items-center text-24px b-1 b="#8F4CD7">{tag.sign}</span>
              : <span block w-48px h-48px rounded="24px" bg="#EFEFEF"
                flex justify-center items-center text-24px b-1 b-transparent>{tag.sign}</span>
            }
            <span text-12px text="#666">{tag.name}</span>
          </li>
        )}
      </ol>
    </div>
  )
}
