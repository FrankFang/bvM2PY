import { useState } from 'react'

type Props = {
  className?: string
}
export const DateAndAmount: React.FC<Props> = (props) => {
  const { className } = props
  const [x, setX] = useState('')
  return (
    <div b-1 b-blue className={className}>
      <input value={x} onChange={e => setX(e.target.value)} />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />
      DateAndAmount <br />

    </div>
  )
}
