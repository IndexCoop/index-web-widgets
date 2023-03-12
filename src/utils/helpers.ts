/**
 * Trim an array from an arbitrary length to a fixed length
 * If fixed length is greater than array, return array
 */
export function trimArray(array: any[], fixedLength: number) {
  if (array.length < fixedLength) return array;

  const step = array.length / fixedLength;
  const newArray = [];

  for (let i = 0; i < fixedLength; i += 1) {
    const index = Math.floor(i * step);
    newArray.push(array[index]);
  }

  return newArray;
}
