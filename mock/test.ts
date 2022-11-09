import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/v1/me',
    method: 'get',
    response: () => {
      return {
        id: 1,
        email: 'frank@frank.com'
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    response: () => {
      return {
        resources: [{
          id: 1,
          user_id: 1,
          amount: 1000,
        }],
        pager: {
          page: 1,
          per_page: 25,
          count: 100
        }
      }
    },
  },
] as MockMethod[]
