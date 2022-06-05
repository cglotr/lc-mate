import type { User } from '../types/user'

export interface UserService {
  getUsers: (usernames: string[]) => Promise<User[]>
}
