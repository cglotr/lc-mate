import type { Api } from './api'
import type { User } from './user'

const BASE_URL = 'https://lc-mate-backend.herokuapp.com'

export class ApiImpl implements Api {
  async getUsers(usernames: string[]) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usernames,
      })
    })
      .then(response => response.json())
      .then(json => {
        return json.users as User[]
      })
  }
}
