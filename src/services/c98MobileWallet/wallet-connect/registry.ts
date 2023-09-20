import { OS, Wallet } from '@cosmos-kit/core'

import { ICON } from '../constants'

export const c98MobileInfo: Wallet = {
  name: 'c98-mobile',
  prettyName: 'C98 Mobile',
  logo: ICON,
  mode: 'wallet-connect',
  mobileDisabled: false,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      device: 'mobile',
      os: 'android',
      link: 'https://play.google.com/store/apps/details?id=coin98.crypto.finance.media&pli=1',
    },
    {
      device: 'mobile',
      os: 'ios',
      link: 'https://apps.apple.com/us/app/coin98-wallet/id1561969966',
    },
  ],
  connectEventNamesOnWindow: ['c98_keystorechange'],
  walletconnect: {
    name: 'C98',
    projectId: '###',
    encoding: 'base64',
    mobile: {
      native: {
        ios: 'coin98:',
        android: 'intent:',
      },
    },
    formatNativeUrl: (appUrl: string, wcUri: string, os: OS | undefined, _name: string): string => {
      const plainAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '')
      const encodedWcUrl = encodeURIComponent(wcUri)
      switch (os) {
        case 'ios':
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`
        case 'android':
          return `${plainAppUrl}://wcV2?${encodedWcUrl}#Intent;package=coin98.crypto.finance.media;scheme=###;end;`
        default:
          return `${plainAppUrl}://wcV2?${encodedWcUrl}`
      }
    },
  },
}
