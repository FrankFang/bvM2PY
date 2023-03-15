var isDev: boolean
type JSONValue = string | number | boolean | null | { [k: string | number]: JSONValue } | JSONValue[]
type Resource<T> = {
  resource: T
}
type Resources<T> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}
type Item = {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}
type Tag = {
  id: number
  kind: Item['kind']
  user_id: number
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}
