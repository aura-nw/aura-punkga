import { capitalize } from 'lodash'
import getConfig from 'next/config'

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
export const validatePassword = (password: string) => {
  return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/)
}
export function formatStatus(word: string) {
  return capitalize(word.replaceAll('-', '').toLowerCase())
}
export function getBlurUrl() {
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)
  return `data:image/svg+xml;base64,${toBase64(shimmer(10, 10))}`
}
export function appendHttps(url: string) {
  return url.includes('https://') ? url : `https://${url}`
}
export const levelToXp = (level) => {
  const a = 100
  const b = 1.1
  const n = level

  const breakLevel = 26
  const m = n % breakLevel
  const i = Math.floor(n / breakLevel)

  const y = ((a * (1 - b ** breakLevel)) / (1 - b)) * i + (a * (1 - b ** m)) / (1 - b)

  return y
}
export const statusColor = (status: string) => {
  switch (status) {
    case 'Published':
      return 'success'
    case 'Upcoming':
    case 'Up-coming':
    case 'Ongoing':
    case 'On-going':
      return 'warning'

    default:
      break
  }
}
export const oauthLogin = async (
  oauthProvider: string,
  roles?: string[],
  redirect_uri?: string,
  state?: string
): Promise<void> => {
  let urlState = state
  const config = getConfig()
  if (!urlState) urlState = btoa(createRandomString())

  if (roles && roles.length) urlState += `&roles=${roles.join(',')}`

  window.location.replace(
    `${config.AUTHORIZER_URL}/oauth_login/${oauthProvider}?redirect_uri=${
      redirect_uri || config.REDIRECT_URL
    }&state=${urlState}`
  )
}
const createRandomString = () => {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.'
  let random = ''
  const crypto = (window.crypto || (window as any).msCrypto) as Crypto
  if (crypto) {
    const randomValues = Array.from(crypto.getRandomValues(new Uint8Array(43)))
    randomValues.forEach((v) => (random += charset[v % charset.length]))
  }
  return random
}
export const openSignInModal = () => {
  ;(document.querySelector('#open-sign-in-btn') as any)?.click()
}