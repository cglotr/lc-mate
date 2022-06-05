import { getUsername } from './util'
import { styleA } from './util'
import { UserLinkNode } from './types/user_link_node'
import { UserService } from './service/user_service'

const userNodes = new Map<string, UserLinkNode[]>()

export function work(userService: UserService) {
  return () => {
    const usernames: string[] = []
    const tmpUserNodes = new Map<string, UserLinkNode[]>()

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

    userService.getUsers(usernames).then(users => {
      for (let user of users) {
        if (!userNodes.has(user.username)) {
          return
        }
        userNodes.get(user.username)?.forEach(node => {
          styleA(node, user)
        })
      }
    })
  }
}
