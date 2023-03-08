export const cleanObject = <T>(obj: T): T =>
  Object.keys(obj)
    .filter((key) => obj[key as keyof T])
    .reduce((acc, key) => {
      const value = obj[key as keyof T]
      return {
        ...acc,
        [key]: typeof value === 'string' ? value.trim() : value,
      }
    }, {} as T)
