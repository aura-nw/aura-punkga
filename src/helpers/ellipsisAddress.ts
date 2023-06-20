export const ellipsisAddress = (
  str: string,
  startCharacter = 8,
  endCharacter = 8
) => {
  if (str.length > startCharacter + endCharacter) {
    return (
      str.substring(0, startCharacter) +
      '...' +
      str.substring(str.length - endCharacter, str.length)
    );
  }
  return str;
};
