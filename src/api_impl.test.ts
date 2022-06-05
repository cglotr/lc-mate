import { ApiImpl } from './api_impl'
import { User } from './user'

global.fetch = jest.fn((input, config) => {
  if (config.method === 'POST') {
    if (input === 'https://lc-mate-backend.herokuapp.com/users') {
      if (config.body === `{"usernames":["awice","hiepit"]}`) {
        const users: User[] = [
          {
            username: 'awice',
            rating: 2945,
            rank: 'Guardian'
          },
          {
            username: 'hiepit',
            rating: 1994,
            rank: 'Knight'
          }
        ]
        return Promise.resolve({
          json: () => Promise.resolve({ users }),
        })
      }
    }
  }
  return Promise.reject()
}) as jest.Mock

describe('ApiImpl', () => {
  const apiImpl = new ApiImpl()
  describe('getUsers', () => {
    test('fetching users', async () => {
      apiImpl.getUsers(['awice', 'hiepit']).then((users) => {
        expect(users.length).toBe(2)

        expect(users[0].username).toBe('awice')
        expect(users[0].rating).toBe(2945)
        expect(users[0].rank).toBe('Guardian')

        expect(users[1].username).toBe('hiepit')
        expect(users[1].rating).toBe(1994)
        expect(users[1].rank).toBe('Knight')
      })
    })
  })
})
