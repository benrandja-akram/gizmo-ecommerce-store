import { WWW } from './constants'

function getURL(path: string) {
  return new URL(path, WWW).toString()
}

export { getURL }
