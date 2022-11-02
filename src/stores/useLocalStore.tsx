import create from 'zustand'

interface Local {
  hasReadWelcomes: boolean
  setHasReadWelcomes: (read: boolean) => void
}
const init = localStorage.getItem('hasReadWelcomes')
export const useLocalStore = create<Local>((set, get) => (
  {
    hasReadWelcomes: init === 'yes',
    setHasReadWelcomes: (read: boolean) => {
      const result = read ? 'yes' : 'no'
      localStorage.setItem('hasReadWelcomes', result)
      set({ hasReadWelcomes: result === 'yes' })
    },
  }
))
