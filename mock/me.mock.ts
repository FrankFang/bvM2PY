import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: '/api/v1/me',
  method: 'get',
  statusCode: 200,
  response: () => {
    return {
      resource: {
        id: 1
      }
    }
  },
}
