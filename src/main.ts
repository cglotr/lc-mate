import { work } from './work'
import { ApiImpl } from './api_impl'

const WORK_INTERVAL = 1000

function main() {
  const apiImpl = new ApiImpl()
  setInterval(work(apiImpl), WORK_INTERVAL)
}

main()
