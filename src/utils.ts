export function toShortAddress(_address: string): string {
  const address = (_address || '').toString();

  return address.length > 13
    ? `${address.slice(0, 6)}…${address.slice(-6)}`
    : address;
}

export function toDate(_timestamp: string) {
  const formated_timestamp = _timestamp.replaceAll(',', '');
  const date: Date = new Date(Number(formated_timestamp));

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${month}-${day} ${hour}:${minute}`;
}

export const isExpired = (_timestamp: string) => {
  const now = Date.now();
  const formated_timestamp = _timestamp.replaceAll(',', '');
  if (now >= Number(formated_timestamp)) return true;

  return false;
};
