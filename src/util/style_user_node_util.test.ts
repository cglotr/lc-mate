import { styleUserNodeUtil } from './style_user_node_util'
import { UserLinkNode } from './../types/user_link_node'

describe('styleUserNodeUtil', () => {
  test('styling user based on rating', () => {
    const tests = [
      {
        user: {
          username: 'awice',
          rating: 2945,
          rank: 'Guardian'
        },
        expected: {
          text: 'awice · 2945',
          backgroundColor: '#4285F4',
          color: '#FFFFFF',
          padding: '0 2px',
          borderRadius: '2px'
        }
      },
      {
        user: {
          username: 'hiepit',
          rating: 1994,
          rank: 'Knight'
        },
        expected: {
          text: 'hiepit · 1994',
          backgroundColor: '#0F9D58',
          color: '#FFFFFF',
          padding: '0 2px',
          borderRadius: '2px'
        }
      },
      {
        user: {
          username: 'cxky',
          rating: 1791,
          rank: ''
        },
        expected: {
          text: 'cxky · 1791',
          backgroundColor: '',
          color: '',
          padding: '',
          borderRadius: ''
        }
      }
    ]
    tests.forEach((test) => {
      const a: UserLinkNode = {
        text: '',
        href: '',
        style: {
          borderRadius: '',
          padding: '',
          backgroundColor: '',
          color: ''
        },
        firstChild: {
          nodeName: ''
        }
      }
      const actual = styleUserNodeUtil(a, test.user)
      expect(actual.text).toBe(test.expected.text)
      expect(actual.style.borderRadius).toBe(test.expected.borderRadius)
      expect(actual.style.padding).toBe(test.expected.padding)
      expect(actual.style.backgroundColor).toBe(test.expected.backgroundColor)
      expect(actual.style.color).toBe(test.expected.color)
    })
  })
})
