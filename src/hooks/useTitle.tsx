import { useEffect } from 'react'

export const useTitle = (title?: string) => {
  useEffect(() => {
    if (title === undefined || title === null) { return }
    document.title = title
  }, [])
}
