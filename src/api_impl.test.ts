import { ApiImpl } from './api_impl'

global.fetch = jest.fn((input) => {
  const user = {
    username: '',
    rating: 0,
    rank: ''
  }
  if (input === 'https://lc-mate-backend.herokuapp.com/user?username=cglotr') {
    user.username = 'cglotr'
    user.rating = 2000
    user.rank = 'Knight'
  }
  return Promise.resolve({
    json: () => Promise.resolve({ user }),
  })
}) as jest.Mock

describe('ApiImpl', () => {
  const apiImpl = new ApiImpl()
  describe('getUser', () => {
    test('fetching user', async () => {
      apiImpl.getUser('cglotr').then((user) => {
        expect(user.username).toBe('cglotr')
        expect(user.rating).toBe(2000)
        expect(user.rank).toEqual('Knight')
      })
    })
  })
})
