import type { Api } from './api'
import type { User } from './user'
import { getUsername } from './util'
import { styleA } from './util'

const users_map = new Map<string, User>()

export function work(api: Api) {
  return () => {
    document.querySelectorAll('a').forEach((linkNode) => {
      const link = linkNode.href
      const username = getUsername(link)
      if (username === '') {
        return
      }
      if (!linkNode.firstChild || linkNode.firstChild.nodeName !== '#text') {
        return
      }
      if (!users_map.has(username)) {
        const user: User = {
          username: username,
          rating: 0,
          rank: ''
        }
        users_map.set(username, user)
        api.getUser(username).then(user => {
          users_map.set(username, user)
        })
      } else {
        const user = users_map.get(username)
        if (user) {
          styleA(linkNode, user)
        }
      }
    })
  }
}
