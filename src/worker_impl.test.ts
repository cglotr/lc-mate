/**
 * @jest-environment jsdom
 */

import { WorkerImpl } from './worker_impl'
import { Doc } from './types/doc'
import { UserService } from './service/user_service'
import { UserLinkNode } from './types/user_link_node'


describe('WorkerImpl', () => {
  describe('start', () => {
    test('running worker for 2 seconds', async () => {
      const usernameNode: UserLinkNode = {
        text: 'awice',
        href: 'https://leetcode.com/awice',
        style: {
          borderRadius: '',
          padding: '',
          backgroundColor: '',
          color: ''
        },
        firstChild: {
          nodeName: '#text'
        }
      }
      const imgNode: UserLinkNode = {
        text: 'numb3r5',
        href: 'https://leetcode.com/numb3r5',
        style: {
          borderRadius: '',
          padding: '',
          backgroundColor: '',
          color: ''
        },
        firstChild: {
          nodeName: 'IMG'
        }
      }
      const docMock: Doc = {
        querySelectorAll: (selectors: string) => {
          return [usernameNode, imgNode]
        }
      }
      const userServiceMock: UserService = {
        getUsers: jest.fn((usernames: string[]) => {
          return Promise.resolve(usernames.map(username => {
            return {
              username,
              rating: 9000,
              rank: 'Guardian'
            }
          }))
        })
      }
      const workerImpl = new WorkerImpl(docMock, userServiceMock)

      workerImpl.start()
      await new Promise((r) => setTimeout(r, 2000))
      workerImpl.stop()

      expect(userServiceMock.getUsers).toBeCalledWith(['awice'])

      expect(usernameNode.text).toBe('awice · 9000')
      expect(usernameNode.style.borderRadius).toBe('2px')
      expect(usernameNode.style.padding).toBe('0 2px')
      expect(usernameNode.style.backgroundColor).toBe('#4285F4')
      expect(usernameNode.style.color).toBe('#FFFFFF')

      expect(imgNode.text).toBe('numb3r5')
      expect(imgNode.style.borderRadius).toBe('')
      expect(imgNode.style.padding).toBe('')
      expect(imgNode.style.backgroundColor).toBe('')
      expect(imgNode.style.color).toBe('')
    })
  })
})
