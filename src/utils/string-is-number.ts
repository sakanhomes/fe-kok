type stringIsNumber = (str: string) => boolean

export const stringIsNumber: stringIsNumber = (str) => {
  const INPUT_NUMBER_REG_EXP = /^\d*[.,]?\d*$/
  return INPUT_NUMBER_REG_EXP.test(str)
}
