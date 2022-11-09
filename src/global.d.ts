var isDev: boolean
interface Resource<T> {
  resource: T
}
interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
interface User {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}
interface Item {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'incomes'
  deleted_at?: string
}
