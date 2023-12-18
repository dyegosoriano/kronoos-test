import Intl from 'intl'

export const formatCurrency = (value: any) => {
  const nf = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return nf.format(value)
}

export const validateCNPJ = (value: string) => {
  if (!value) return false

  const isString = typeof value === 'string'
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

  if (!validTypes) return false

  if (isString) {
    const digitsOnly = /^\d{14}$/.test(value)
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

    if (!digitsOnly && !validFormat) return false
  }

  const match = value.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  if (numbers.length !== 14) return false

  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  const calc = (x: number) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  const digits = numbers.slice(12)
  const digit0 = calc(12)

  if (digit0 !== digits[0]) return false

  const digit1 = calc(13)
  if (digit1 !== digits[1]) return false

  return true
}

export const validateCPF = (raw: string) => {
  let total = 0
  let rest

  if (raw === '00000000000') return false

  for (let i = 1; i <= 9; i++) total = total + parseInt(raw.substring(i - 1, i)) * (11 - i)

  rest = (total * 10) % 11

  if (rest === 10 || rest == 11) rest = 0
  if (rest !== parseInt(raw.substring(9, 10))) return false

  total = 0

  for (let i = 1; i <= 10; i++) total = total + parseInt(raw.substring(i - 1, i)) * (12 - i)

  rest = (total * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest !== parseInt(raw.substring(10, 11))) return false

  return true
}

export const formatData = (date: string) => {
  const data = new Date()

  const month = String(data.getMonth() + 1).padStart(2, '0')
  const day = String(data.getDate()).padStart(2, '0')
  const year = data.getFullYear()

  return year + month + day
}
