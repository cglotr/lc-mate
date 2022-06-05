import type { Api } from './api'
import type { User } from './user'
import { getUsername } from './util'
import { styleA } from './util'
import { A } from './a'

const userNodes = new Map<string, A[]>()

export function work(api: Api) {
  return () => {
    const usernames: string[] = []
    const tmpUserNodes = new Map<string, A[]>()
    document.querySelectorAll('a').forEach((linkNode) => {
      const link = linkNode.href
      const username = getUsername(link)
      if (username === '') {
        return
      }
      if (!linkNode.firstChild || linkNode.firstChild.nodeName !== '#text') {
        return
      }
      usernames.push(username)
      if (!tmpUserNodes.has(username)) {
        tmpUserNodes.set(username, [])
      }
      tmpUserNodes.get(username)?.push(linkNode)
    })
    tmpUserNodes.forEach((nodes, username) => {
      userNodes.set(username, nodes)
    })
    api.getUsers(usernames).then(users => {
      users.forEach(user => {
        if (!userNodes.has(user.username)) {
          return
        }
        userNodes.get(user.username)?.forEach(node => {
          styleA(node, user)
        })
      })
    })
  }
}
