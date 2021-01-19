export function capitalize(string) {
  //если передали например undefined
  if (typeof string != 'string') {
    return ''
  }
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}