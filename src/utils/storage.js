export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
export const setItem = (name, data) => {
  if (typeof data === 'object') {
    window.localStorage.setItem(name, JSON.stringify(data))
  } else {
    window.localStorage.setItem(name, data)
  }
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
