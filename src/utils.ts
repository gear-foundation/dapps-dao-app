export function toShortAddress(_address: string) : string {
  const address = (_address || '').toString();

  return (address.length > 13)
    ? `${address.slice(0, 6)}…${address.slice(-6)}`
    : address;
}

export function toDate(_timestamp: string) {

  const formated_timestamp = _timestamp.replaceAll(',', '');
  const date: Date = new Date(Number(formated_timestamp));

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' })
  const hour = date.getHours();
  const minute = date.getMinutes()

  return `${day} ${month} ${hour}:${minute}`
}