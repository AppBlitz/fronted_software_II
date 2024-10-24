const getItem = <T>(key: string): T | null => {
  return JSON.parse(localStorage.getItem(key)!)
}
const setItem = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export { getItem, setItem }
