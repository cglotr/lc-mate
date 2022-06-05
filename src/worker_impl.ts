import { UserService } from './service/user_service'
import { Worker } from './worker'
import { getUsername, styleA } from './util'
import { UserLinkNode } from './types/user_link_node'
import { Doc } from './types/doc'

const WORK_INTERVAL = 1000

export class WorkerImpl implements Worker {
  private userNodes = new Map<string, UserLinkNode[]>()
  private loop: NodeJS.Timer | null = null

  private doc: Doc
  private userService: UserService

  constructor(doc: Doc, userService: UserService) {
    this.doc = doc
    this.userService = userService
  }

  start(): boolean {
    this.loop = setInterval(() => {
      this.work()
    }, WORK_INTERVAL)
    return this.loop !== null
  }

  stop(): boolean {
    if (!this.loop) {
      return false
    }
    clearInterval(this.loop)
    return true
  }

  private work(): void {
    const usernames: string[] = []
    const tmpUserNodes = new Map<string, UserLinkNode[]>()

    this.doc.querySelectorAll('a').forEach((linkNode) => {
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
      this.userNodes.set(username, nodes)
    })

    this.userService.getUsers(usernames).then(users => {
      for (let user of users) {
        if (!this.userNodes.has(user.username)) {
          return
        }
        this.userNodes.get(user.username)?.forEach(node => {
          styleA(node, user)
        })
      }
    })
  }
}
