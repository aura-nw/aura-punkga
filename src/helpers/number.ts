import BigNumber from 'bignumber.js';
import { ONE_BILLION, ONE_TRILLION } from 'constants/number';
import Config from './config';

const MAX_DISPLAY_DECIMALS = 6;
const DEFAULT_DECIMALS = 6;

const _getUnitDecimals = (decimals = 6) =>
  new BigNumber(`1${Array(decimals).fill(0).join('')}`);

const _getMaxDecimals = (strNumber: string, decimals = DEFAULT_DECIMALS) => {
  const _decimals =
    decimals > MAX_DISPLAY_DECIMALS ? MAX_DISPLAY_DECIMALS : decimals;
  const decimalPath = strNumber?.split('.');
  if (decimalPath?.length < 2) return 0;

  const decimal = decimalPath[1];
  const numberDecimal = Number(Array.from(decimal).reverse().join(''));

  const maxDecimal = numberDecimal > 0 ? `${numberDecimal}`.length : 0;

  return maxDecimal < _decimals ? maxDecimal : _decimals;
};

export const formatStringNumber = (
  strNumber: string,
  decimals = DEFAULT_DECIMALS
) => {
  if (!strNumber) return '0.0';

  const bigNumber = new BigNumber(strNumber);
  return formatBigNumber(bigNumber, decimals);
};

export const formatBigNumber = (
  bigNumber: BigNumber,
  decimals = DEFAULT_DECIMALS
) => {
  if (!bigNumber || bigNumber.isNaN() || bigNumber.isZero()) return '0.0';

  const numberStr = bigNumber.toFormat(decimals, BigNumber.ROUND_DOWN, {
    decimalSeparator: '.'
  });
  const maxDecimal = _getMaxDecimals(numberStr, decimals);

  return bigNumber.toFormat(maxDecimal, BigNumber.ROUND_DOWN);
};

export const formatFromUnit = (unit: string, decimals = DEFAULT_DECIMALS) => {
  const bigNumber = unitToBigNumber(unit, decimals);

  return formatBigNumber(bigNumber, decimals);
};

export const formatFromUnitNumber = (
  bigNumber: BigNumber,
  decimals = DEFAULT_DECIMALS
) => {
  return formatBigNumber(
    bigNumber.dividedBy(_getUnitDecimals(decimals)),
    decimals
  );
};

export const unitToBigNumber = (unit: string, decimals = DEFAULT_DECIMALS) => {
  return new BigNumber(unit).dividedBy(_getUnitDecimals(decimals));
};

export const unitBigNumberToValue = (
  bigNumber: BigNumber,
  decimals = DEFAULT_DECIMALS
) => {
  return bigNumber.dividedBy(_getUnitDecimals(decimals));
};

export const bigNumberToUnit = (
  bigNumber: BigNumber,
  decimals = DEFAULT_DECIMALS
) => {
  if (!bigNumber || bigNumber.isNaN() || bigNumber.isZero())
    return new BigNumber('0');

  return bigNumber.multipliedBy(_getUnitDecimals(decimals));
};

export const bigNumberToUnitString = (
  bigNumber: BigNumber,
  decimals = DEFAULT_DECIMALS
) => {
  const decimal = bigNumberToUnit(bigNumber, decimals);
  return decimal.toFormat(0, BigNumber.ROUND_DOWN, {});
};

export const bigNumberUnitToString = (bigNumber: BigNumber) => {
  return bigNumber.toFormat(0, BigNumber.ROUND_DOWN, {});
};

export const formattedToUnitString = (
  formatted: string,
  decimals = DEFAULT_DECIMALS
) => {
  const decimal = formattedToUnit(formatted, decimals);
  return decimal.toFormat(0, BigNumber.ROUND_DOWN, {});
};

export const stringNumberToUnitString = (
  strNumber: string,
  decimals = DEFAULT_DECIMALS
) => {
  const decimal = stringNumberToUnit(strNumber, decimals);
  return decimal.toFormat(0, BigNumber.ROUND_DOWN, {});
};

export const stringNumberToUnit = (
  strNumber: string,
  decimals = DEFAULT_DECIMALS
) => {
  if (!strNumber) return new BigNumber('0');

  return new BigNumber(strNumber).multipliedBy(_getUnitDecimals(decimals));
};

export const formattedToUnit = (
  formatted: string,
  decimals = DEFAULT_DECIMALS
) => {
  if (!formatted) return new BigNumber('0');

  const bigNumber = formattedToBigNumber(formatted);
  return bigNumberToUnit(bigNumber, decimals);
};

export const formattedToBigNumber = (formatted: string) => {
  if (!formatted) return new BigNumber('0');

  const strNumber = formatted.replaceAll(',', '');
  return new BigNumber(strNumber);
};

export const getDecimalsFromConfig = (denom: string) => {
  const coinMap = Config.chainInfo.coinMap;

  const coinToDisplay = coinMap[denom];
  if (!coinToDisplay) return DEFAULT_DECIMALS;

  return coinToDisplay.fractionalDigits;
};

export const shortFormat = (number: BigNumber) => {
  if (number.lt(ONE_BILLION)) return '';

  if (number.lt(ONE_TRILLION)) {
    return formatBigNumber(number.dividedBy(ONE_BILLION), 2) + 'B';
  }

  return formatBigNumber(number.dividedBy(ONE_TRILLION), 2) + 'T';
};
