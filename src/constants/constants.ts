export enum Themes {
  DARK = 'dark',
  LIGHT = 'light'
}

export const LAST_USED_THEME = 'LAST_USED_THEME';

export const FAVORITE_TOKENS = 'FAVORITE_TOKENS';

export const MAXIMUM_FAVORITE_TOKENS = 12;

export const SWAP_CHART_LOCAL_STORAGE = 'SWAP_CHART';

export const TRANSACTION_SETTING_LOCAL_STORAGE = 'TRANSACTION_SETTING';

export const MINUTE_DURATION = 1000 * 60;
export const HOUR_DURATION = MINUTE_DURATION * 60;
export const DAY_DURATION = MINUTE_DURATION * 60 * 24;

export const CHAIN_ID_MOCK = 'binance-smart-chain';
export const VS_CURRENCY = 'usd';
export const MINIMUM_LIQUIDITY = 1;
export const MIN_TOKEN = Math.pow(10, -6);
export const LP_SYMBOL_REGEX = /^[a-zA-Z]{0,}-[a-zA-Z]{0,} LP$/;

//Swap Panel
export const VERY_HIGH_PRICE_IMPACT = 'Price impact is very high';
export const HIGH_PRICE_IMPACT = 'Price impact is high';
export const MAX_DISPLAY_DECIMALS = 6;
export const MAX_DECIMAL_INPUT_CHARACTER = 20;

//
export const AURA_LINK = 'https://aura.network';
export const AUDIT_LINK = 'https://github.com/halotrade-zone/audit-report';
export const CONTRACT_QUERY_SIZE = 10;
