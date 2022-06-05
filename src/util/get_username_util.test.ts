import { getUsernameUtil } from './get_username_util'

describe('getUsernameUtil', () => {
  test('valid usernames', () => {
    const tests = [
      'https://leetcode.com/awice/',
      'https://leetcode.com/larryNY/',
      'https://leetcode.com/numb3r5'
    ]
    tests.forEach(link => {
      const actual = getUsernameUtil(link)
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
      const actual = getUsernameUtil(link)
      expect(actual).toEqual('')
    })
  })

  test('invalid link', () => {
    const tests = [
      'https://leetcode.cn/awice'
    ]
    tests.forEach(link => {
      const actual = getUsernameUtil(link)
      expect(actual).toEqual('')
    })
  })
})
