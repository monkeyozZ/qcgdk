export function trantime (params) {
  return new Date(parseInt(params) * 1000).toLocaleString()
}

export function subcode (params) {
  if (params !== undefined) {
    return params.substr(params.length - 4)
  }
}
