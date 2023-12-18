import Intl from 'intl'

export const formatCurrency = (value: any) => {
  const nf = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return nf.format(value)
}
