import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 1.25s linear infinite;
  }
`

interface Props {
  className?: string
  message?: string
}

export const Loading: React.FC<Props> = ({ className, message }) => {
  return (
    <Div className={c('flex flex-col justify-center items-center', className)}>
      <Icon name="loading" className='w-128px h-128px' />
      <p p-8px text-lg>{message || '加载中……'}</p>
    </Div>
  )
}
