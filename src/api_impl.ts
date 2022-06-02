import type { Api } from './api'
import type { User } from './user'

const BASE_URL = 'https://lc-mate-backend.herokuapp.com'

export class ApiImpl implements Api {
  async getUser(username: string) {
    return fetch(`${BASE_URL}/user?username=${username}`)
      .then(response => response.json())
      .then(json => {
        return json.user as User
      });
  }
}
