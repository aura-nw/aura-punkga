export const formatAddress = (addr: string): string => {
  addr = addr || '';
  return addr.substring(0, 5) + "..." + addr.substring(addr.length - 5, addr.length);
}
