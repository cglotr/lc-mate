import type { User } from '../types/user'

export interface Api {
  getUsers: (usernames: string[]) => Promise<User[]>
}
