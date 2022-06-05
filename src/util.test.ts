import { getUsername } from './util'
import { styleA } from './util'
import { UserLinkNode } from './types/user_link_node'

describe('getUsername', () => {
  test('valid usernames', () => {
    const tests = [
      'https://leetcode.com/awice/',
      'https://leetcode.com/larryNY/',
      'https://leetcode.com/numb3r5'
    ]
    tests.forEach(link => {
      const actual = getUsername(link)
      expect(actual).not.toEqual('')
    })
  })

  test('invalid usernames', () => {
    const tests = [
      'https://leetcode.com/support',
      'https://leetcode.com/jobs',
      'https://leetcode.com/bugbounty',
      'https://leetcode.com/student',
      'https://leetcode.com/terms',
      'https://leetcode.com/privacy',
      'https://leetcode.com/region',
      'https://leetcode.com/explore',
      'https://leetcode.com/contest',
      'https://leetcode.com/discuss',
      'https://leetcode.com/interview',
    ]
    tests.forEach(link => {
      const actual = getUsername(link)
      expect(actual).toEqual('')
    })
  })

  test('invalid link', () => {
    const tests = [
      'https://leetcode.cn/awice'
    ]
    tests.forEach(link => {
      const actual = getUsername(link)
      expect(actual).toEqual('')
    })
  })
})

describe('styleA', () => {
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
          color: '#FFFFFF'
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
          color: '#FFFFFF'
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
          color: ''
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
      const actual = styleA(a, test.user)
      expect(actual.text).toBe(test.expected.text)
      expect(actual.style.borderRadius).toBe('2px')
      expect(actual.style.padding).toBe('0 2px')
      expect(actual.style.backgroundColor).toBe(test.expected.backgroundColor)
      expect(actual.style.color).toBe(test.expected.color)
    })
  })
})
