import { work } from './work'
import { ApiImpl } from './api/api_impl'
import { UserServiceImpl } from './service/user_service_impl'

const WORK_INTERVAL = 1000

function main() {
  const apiImpl = new ApiImpl()
  const userService = new UserServiceImpl(apiImpl)
  setInterval(work(userService), WORK_INTERVAL)
}

main()
