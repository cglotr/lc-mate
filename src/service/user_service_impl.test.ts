import { Api } from './../api/api'
import { UserServiceImpl } from './user_service_impl'

describe('UserServiceImpl', () => {
  describe('getUsers', () => {
    test('getting users from api & then from cache', async () => {
      const apiMock: Api = {
        getUsers: jest.fn((usernames: string[]) => {
          return Promise.resolve(usernames.map(username => {
            return {
              username,
              rating: 9000,
              rank: 'Guardian'
            }
          }))
        })
      }
      const userServiceImpl = new UserServiceImpl(apiMock)

      const actual = await userServiceImpl.getUsers(['awice', 'numb3r5'])

      expect(apiMock.getUsers).toBeCalled()
      expect(actual.length).toBe(2)

      expect(actual[0].username).toBe('awice')
      expect(actual[0].rating).toBe(9000)
      expect(actual[0].rank).toBe('Guardian')

      expect(actual[1].username).toBe('numb3r5')
      expect(actual[1].rating).toBe(9000)
      expect(actual[1].rank).toBe('Guardian')

      jest.clearAllMocks()
      const cached = await userServiceImpl.getUsers(['awice', 'numb3r5'])

      expect(apiMock.getUsers).not.toBeCalled()
      expect(cached.length).toBe(2)

      expect(cached[0].username).toBe('awice')
      expect(cached[0].rating).toBe(9000)
      expect(cached[0].rank).toBe('Guardian')

      expect(cached[1].username).toBe('numb3r5')
      expect(cached[1].rating).toBe(9000)
      expect(cached[1].rank).toBe('Guardian')
    })
  })
})
