import c from 'classnames'
import s from './Icon.module.scss'
interface Props {
  className?: string
  name: string
}
export const Icon: React.FC<Props> = ({ name, className }) => {
  return (
    <svg className={c(className, s.icon)}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
