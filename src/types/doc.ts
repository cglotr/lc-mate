import { UserLinkNode } from './user_link_node'

export type Doc = {
  querySelectorAll(selectors: string): UserLinkNode[]
}
