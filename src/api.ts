import type { User } from './user'

export interface Api {
  getUser: (username: string) => Promise<User>
}
