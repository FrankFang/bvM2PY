import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Input } from '../../components/Input'
import { hasError, validate } from '../../lib/validate'
import { useCreateTagStore } from '../../stores/useCreateTagStore'

type Props = {
  type: 'create' | 'edit'
}
export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const { data, error, setData, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (type !== 'create') { return }
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind 必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    setData({ kind })
  }, [searchParams])
  const params = useParams()
  useEffect(() => {
    if (type !== 'edit') { return }
    const id = params.id
    if (!id) { throw new Error('id 必填') }
    // 发起 AJAX 请求
    // 然后 setData
  }, [])

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      // 发起 AJAX 请求
    }
  }
  return (
    <form onSubmit={onSubmit} p-16px p-t-32px flex flex-col gap-y-8px>
      <Input label='标签名' error={error.name?.[0]} value={data.name}
        onChange={name => setData({ name })} />
      <Input type='emoji' label={<span>图标 <span text-24px>{data.sign}</span></span>}
        value={data.sign} onChange={sign => setData({ sign })}
        error={error.sign?.[0]} />
      <p text-center p-b-24px>记账时长按标签，即可进行编辑</p>
      <div>
        <button j-btn>确定</button>
      </div>
    </form>
  )
}
