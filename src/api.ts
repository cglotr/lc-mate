import type { User } from './user'

export interface Api {
  getUsers: (usernames: string[]) => Promise<User[]>
}
