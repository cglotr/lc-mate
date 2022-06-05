import { ApiImpl } from './api/api_impl'
import { UserServiceImpl } from './service/user_service_impl'
import { WorkerImpl } from './worker_impl'

export function main() {
  const apiImpl = new ApiImpl()
  const userService = new UserServiceImpl(apiImpl)
  const worker = new WorkerImpl(document as any, userService)

  if (worker.start()) {
    console.log('LC Mate worker started.')
  }
}

main()
