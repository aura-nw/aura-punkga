export const setItem = (name: string, value:string, exprire?:Date) => {
  localStorage.setItem(
    name,
    JSON.stringify({
      value,
      exprire,
    })
  )
}

export const getItem = (name: string) => {
  const item = localStorage.getItem(name)
  if (item) { 
    const parsed = JSON.parse(item)
    if (parsed.exprire) {
      const now = new Date().getTime()
      if (now < new Date(parsed.exprire).getTime()) {
        return parsed.value
      } else {
        localStorage.removeItem(name)
        return undefined
      }
    } else {
      return parsed.value
    }
  }
  return undefined
}

export const removeItem = (name: string) => {
  localStorage.removeItem(name)
}