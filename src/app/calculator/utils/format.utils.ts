export function formatNumber(value: string): string {
  console.log(value);
  const dotIndex = value.indexOf('.');
  if (value.substring(dotIndex, value.length).length < 5) return value;
  return parseFloat(value).toFixed(5);
}
