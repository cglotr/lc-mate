import { UserLinkNode } from '../types/user_link_node'
import { User } from '../types/user'

const GOOGLE_BLUE = '#4285F4'
const GOOGLE_GREEN = '#0F9D58'
const WHITE = '#FFFFFF'
const GUARDIAN = 'Guardian'
const KNIGHT = 'Knight'

export function styleUserNodeUtil(a: UserLinkNode, user: User): UserLinkNode {
  if (user.rating > 0) {
    a.text = `${user.username} · ${user.rating}`
  }
  a.style.borderRadius = '2px'
  a.style.padding = '0 2px'
  switch (user.rank) {
    case GUARDIAN: {
      a.style.backgroundColor = GOOGLE_BLUE
      a.style.color = WHITE
      break
    }
    case KNIGHT: {
      a.style.backgroundColor = GOOGLE_GREEN
      a.style.color = WHITE
      break
    }
  }
  return a
}
