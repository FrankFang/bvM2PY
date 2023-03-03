import type { MockMethod } from 'vite-plugin-mock'

export const tagsMock: MockMethod = {
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): Resources<Tag> => {
    const tags = Array.from({ length: 20 }).map<Tag>((tag, index) => ({
      id: index,
      name: `打车${index}`,
      kind: 'expenses',
      sign: '😶',
      user_id: 1,
      created_at: '2000-01-01T00:00:00.000Z',
      updated_at: '2000-01-01T00:00:00.000Z',
      deleted_at: null
    }))
    return {
      resources: tags,
      pager: {
        page: 1,
        per_page: 20,
        count: 20,
      }
    }
  }
  ,
}
