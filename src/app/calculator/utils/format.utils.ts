export function splitNumber(value: string): string {
  let result: string[] = [];
  const tmp = value.replace(/\,/g, '');
  for (let i = tmp.length - 1; i >= 0; i -= 3) {
    result = [tmp.slice(Math.max(i - 2, 0), i + 1), ...result];
  }

  if (result.length > 1) return result.join(',');
  return tmp;
}

export function formatNumber(value: string): string {
  const dotIndex = value.indexOf('.');
  if (dotIndex === -1) return splitNumber(value);

  const beforeDot = value.substring(0, dotIndex);

  if (beforeDot.length > 3) {
    const afterDot = value.substring(dotIndex, value.length);
    return splitNumber(beforeDot) + afterDot;
  }

  return value;
}
