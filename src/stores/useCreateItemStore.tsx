import create from 'zustand'
import type { FormError } from '../lib/validate'

type Date = Item

type CreateItem = {
  data: Partial<Date>
  error: FormError<Date>
  setData: (data: Partial<Date>) => void
  setError: (error: Partial<FormError<Date>>) => void
}
export const useCreateItemStore = create<CreateItem>((set, get) => {
  return {
    data: {
      kind: 'expenses',
      tag_ids: [],
      happen_at: '',
      amount: 0
    },
    error: {
      kind: [],
      tag_ids: [],
      happen_at: [],
      amount: []
    },
    setData: (data: Partial<Data>) => {
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }))
    },
    setError: (error: Partial<FormError<Data>>) => {
      set(state => ({
        ...state,
        error: {
          ...error
        }
      }))
    }
  }
})
