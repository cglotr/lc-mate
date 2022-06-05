import type { UserService } from './user_service'
import type { User } from '../types/user'
import type { Api } from '../api/api'

export class UserServiceImpl implements UserService {
  private api: Api
  private userCache: Map<string, User>

  constructor(api: Api) {
    this.api = api
    this.userCache = new Map<string, User>()
  }

  public async getUsers(usernames: string[]): Promise<User[]> {
    let fetch = false
    for (let username of usernames) {
      if (!this.userCache.has(username)) {
        fetch = true
        this.userCache.set(username, {
          username,
          rating: 0,
          rank: ''
        })
      }
    }
    if (fetch) {
      return this.api.getUsers(usernames)
        .then(users => {
          for (let user of users) {
            this.userCache.set(user.username, user)
          }
          return this.getUsersFromCache(usernames)
        })
    } else {
      return Promise.resolve(this.getUsersFromCache(usernames))
    }
  }

  private getUsersFromCache(usernames: string[]): User[] {
    const users: User[] = []
    for (let username of usernames) {
      const user = this.userCache.get(username)
      if (user) {
        users.push(user)
      }
    }
    return users
  }
}
