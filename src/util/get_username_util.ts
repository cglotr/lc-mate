const USER_LINK_REGEX = /^https:\/\/leetcode.com\/[\w\d-_]+\/?$/
const NON_USERNAMES = new Set([
  'support',
  'jobs',
  'bugbounty',
  'student',
  'terms',
  'privacy',
  'region',
  'explore',
  'contest',
  'discuss',
  'interview'
])

export function getUsernameUtil(link: string): string {
  if (!link.match(USER_LINK_REGEX)) {
    return ''
  }
  const words = link.split('/').filter(x => x !== '')
  const candidate = words[words.length - 1]
  if (NON_USERNAMES.has(candidate)) {
    return ''
  }
  return candidate
}
