import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
export default [
  meMock,
  itemsMock,
] as MockMethod[]
