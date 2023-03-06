import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'
import { tagsMock } from './tags.mock'
export default [
  ...meMock,
  ...itemsMock,
  ...sessionMock,
  ...tagsMock,
] as MockMethod[]
