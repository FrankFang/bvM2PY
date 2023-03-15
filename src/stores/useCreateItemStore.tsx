import create from 'zustand'
import { time } from '../lib/time'
import type { FormError } from '../lib/validate'

type Data = Item

type CreateItem = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}
export const useCreateItemStore = create<CreateItem>((set, get) => {
  return {
    data: {
      kind: 'expenses',
      tag_ids: [],
      happen_at: time().isoString,
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
