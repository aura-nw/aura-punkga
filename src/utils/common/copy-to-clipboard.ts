export const copyToClipboard = (val: string) => {
  navigator.clipboard.writeText(val);
}