import { UserLinkNode } from '../types/user_link_node'
import { User } from '../types/user'

const GOOGLE_BLUE = '#4285F4'
const GOOGLE_GREEN = '#0F9D58'
const WHITE = '#FFFFFF'
const GUARDIAN = 'Guardian'
const KNIGHT = 'Knight'
const BORDER_RADIUS = '2px'
const PADDING = '0 2px'

export function styleUserNodeUtil(a: UserLinkNode, user: User): UserLinkNode {
  if (user.rating > 0) {
    a.text = `${user.username} · ${user.rating}`
  }
  switch (user.rank) {
    case GUARDIAN: {
      a.style.backgroundColor = GOOGLE_BLUE
      a.style.color = WHITE
      a.style.borderRadius = BORDER_RADIUS
      a.style.padding = PADDING
      break
    }
    case KNIGHT: {
      a.style.backgroundColor = GOOGLE_GREEN
      a.style.color = WHITE
      a.style.borderRadius = BORDER_RADIUS
      a.style.padding = PADDING
      break
    }
  }
  return a
}
